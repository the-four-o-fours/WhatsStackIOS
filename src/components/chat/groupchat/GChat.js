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

import {connect} from 'react-redux'
import firebase from 'react-native-firebase'

import GChatBubble from './GChatBubble'

import rsa from '../../rsa'
import {seenMessages} from '../../../store/actions'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gUid: this.props.navigation.getParam('gUid', false),
      members: this.props.navigation.getParam('members', []),
      startsConvo: this.props.navigation.getParam('startsConvo', false),
      newMessage: '',
      height: 26,
    }
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.gUid]) {
      this.props.seenMessages(this.state.gUid)
    }
  }

  sendMessage = () => {
    Keyboard.dismiss()
    const text = this.splitterForRSA(this.state.newMessage)
    const sender = this.props.user
    const sentAt = Date.now()
    this.state.members
      .filter(memberUid => memberUid !== sender.uid)
      .forEach(memberUid => {
        const receiverObj = {
          uid: memberUid,
          publicKey: this.props.contactsHash[memberUid].publicKey,
        }
        console.log(receiverObj)
        const message = this.buildMessage(receiverObj, text, sentAt)
        this.writeToDB(receiverObj.uid, this.state.gUid, message)
      })
    const senderMessage = this.buildMessage(sender, text, sentAt)
    this.writeToDB(sender.uid, this.state.gUid, senderMessage)
    if (this.state.startsConvo) {
      this.updateMembers()
      this.setState({startsConvo: false})
    }
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

  buildMessage = (person, text, timeStamp) => {
    rsa.setPublicString(person.publicKey)
    const encrypted = text.map(chunk => rsa.encrypt(chunk))
    const message = {
      text: encrypted,
      sender: this.props.user.uid,
    }
    const messageObj = {}
    messageObj[timeStamp] = message
    return messageObj
  }

  writeToDB = (pathPt1, pathPt2, message) => {
    const ref = firebase
      .database()
      .ref(`Users/${pathPt1}/${pathPt2}/conversation`)
    ref.update(message)
  }

  updateMembers = () => {
    this.state.members.forEach(memberUid => {
      const ref = firebase
        .database()
        .ref(`Users/${memberUid}/${this.state.gUid}/members`)
      ref.set(this.state.members)
    })
  }

  //should also run onPress for a button for adding members
  //needs functions for pushing new members into this.state.members
  //also slicing them out
  //also a whole sub-comp similar to the contacts arr where you can add members
  //or cancel the add
  //Or we could just not support adding people to groups.

  render() {
    console.log(this.state)
    const gUid = this.state.gUid
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}
      >
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
            {this.props.messages[gUid] ? (
              <ReversedFlatList
                style={styles.chats}
                data={this.props.messages[gUid].conversation}
                keyExtractor={({timeStamp}) => timeStamp}
                renderItem={({item}) => (
                  <GChatBubble message={item} user={this.props.user} />
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
    width: 335,
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
  },
})

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
  contactsHash: state.contactsHash,
})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
