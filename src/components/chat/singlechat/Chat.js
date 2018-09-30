import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ReversedFlatList from 'react-native-reversed-flat-list'
import ChatBubble from './ChatBubble'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'

import rsa from '../../rsa'
import {seenMessages} from '../../../store/actions'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverUid: this.props.navigation.getParam('uid', false),
      newMessage: '',
      height: 26,
    }
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.receiverUid]) {
      this.props.seenMessages(this.state.receiverUid)
    }
  }

  sendMessage = (localUrl = false, cloudUrl) => {
    Keyboard.dismiss()
    const senderText = localUrl
      ? this.splitterForRSA(localUrl)
      : this.splitterForRSA(this.state.newMessage)
    const receiverText = cloudUrl
      ? this.splitterForRSA(cloudUrl)
      : this.splitterForRSA(this.state.newMessage)
    const sender = this.props.user
    const receiver = {
      uid: this.state.receiverUid,
      publicKey: this.props.navigation.getParam('publicKey'),
    }
    const sentAt = Date.now()
    const img = !!localUrl
    const senderMessage = this.buildMessage(sender, senderText, sentAt, img)
    const receiverMessage = this.buildMessage(
      receiver,
      receiverText,
      sentAt,
      img,
    )
    this.writeToDB(sender.uid, receiver.uid, senderMessage)
    this.writeToDB(receiver.uid, sender.uid, receiverMessage)
  }

  // this whole mess is because RSA can only encrypt
  // strings less than 117 characters long
  splitterForRSA = string => {
    const messageChunks = []
    let tracker = 0
    while (tracker < string.length) {
      messageChunks.push(string.slice(tracker, tracker + 117))
      tracker += 117
    }
    return messageChunks
  }

  buildMessage = (person, text, timeStamp, img) => {
    rsa.setPublicString(person.publicKey)
    const encrypted = text.map(chunk => rsa.encrypt(chunk))
    const message = {
      text: encrypted,
      sender: this.props.user.uid,
      img,
    }
    const messageObj = {}
    messageObj[timeStamp] = message
    return messageObj
  }

  writeToDB = (pathPt1, pathPt2, message) => {
    const ref = firebase.database().ref(`Users/${pathPt1}/${pathPt2}`)
    ref.update(message)
  }

  getImagesFromGallery = () => {
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        compressImageQuality: 0.1,
        compressImageMaxWidth: 500,
      })
        .then(images => {
          resolve(images)
        })
        .catch(err => {
          resolve('cancel')
          reject(err)
        })
    })
  }

  getImageFromCamera = () => {
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        compressImageQuality: 0.1,
        compressImageMaxWidth: 500,
      })
        .then(images => {
          resolve([images])
        })
        .catch(err => {
          resolve('cancel')
          reject(err)
        })
    })
  }

  uploadImage = image => {
    return new Promise((resolve, reject) => {
      const metadata = {
        contentType: image.mime,
      }
      const path = Date.now()
      const ref = firebase
        .storage()
        .ref(
          `/Users/${this.props.user.uid}/${this.state.receiverUid}/${path}.jpg`,
        )
      ref
        .putFile(image.sourceURL, metadata)
        .then(res => {
          if (res.state === 'success') resolve([image.sourceURL, ref])
        })
        .catch(err => reject(err))
    })
  }

  sendPictureMessage = async (type = 'gallery') => {
    let images
    if (type === 'camera') {
      console.log('camera upload')
      images = await this.getImageFromCamera()
    } else {
      images = await this.getImagesFromGallery()
    }
    if (images !== 'cancel') {
      const urlArr = await Promise.all(
        images.map(image => this.uploadImage(image)),
      )
      await Promise.all(
        urlArr.map(async url => {
          url[1] = await url[1].getDownloadURL()
          this.sendMessage(url[0], url[1])
        }),
      )
    }
  }

  render() {
    const receiverUid = this.state.receiverUid
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <ImageBackground
          style={{flex: 1}}
          source={require('../../../Public/bgtile.png')}
          resizeMode="repeat"
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss()
            }}
          >
            {this.props.messages[receiverUid] ? (
              <ReversedFlatList
                style={styles.chats}
                data={this.props.messages[receiverUid].conversation}
                keyExtractor={({timeStamp}) => timeStamp}
                renderItem={({item}) => (
                  <ChatBubble
                    message={item}
                    user={this.props.user}
                    navigation={this.props.navigation}
                    title={this.props.navigation.getParam('title', false)}
                  />
                )}
              />
            ) : (
              <View>
                <Text style={styles.noMessages}>Start a conversation ◉‿◉</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        </ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.sendPictureMessage('camera')
            }}
          >
            <Icon name="ios-camera" size={35} color="#006994" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.sendPictureMessage()
            }}
          >
            <Icon name="ios-add" size={35} color="#006994" />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              {
                height: this.state.height,
              },
            ]}
            value={this.state.newMessage}
            multiline={true}
            autoFocus={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="send"
            placeholder="..."
            blurOnSubmit={true}
            onChangeText={newMessage => this.setState({newMessage})}
            onContentSizeChange={event => {
              this.setState({height: event.nativeEvent.contentSize.height + 10})
            }}
            onSubmitEditing={() => {
              this.sendMessage()
              this.setState({newMessage: '', height: 16})
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            disabled={this.state.newMessage.length === 0}
            onPress={() => {
              this.sendMessage()
              this.setState({newMessage: '', height: 16})
            }}
          >
            <Icon name="ios-send" size={35} color="#006994" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  noMessages: {
    fontSize: 32,
    color: '#006994',
    alignSelf: 'center',
    paddingTop: 250,
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  input: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    margin: 5,
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingRight: 3,
    paddingLeft: 3,
  },
})

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
