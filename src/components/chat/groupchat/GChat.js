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
      uid: this.props.navigation.getParam('uid', false),
      members: this.props.navigation.getParam('members', []),
      startsConvo: this.props.navigation.getParam('startsConvo', false),
      newMessage: '',
      height: 29.5, //MagicNo RN always sets hight to this no matter what
    }
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.uid]) {
      this.props.seenMessages(this.state.uid)
    }
  }

  sendMessage = () => {
    Keyboard.dismiss()
    const text = this.splitterForRSA(this.state.newMessage)
    const timeStamp = Date.now()
    this.state.members.forEach(member => {
      //create message obj
      rsa.setPublicString(member.publicKey)
      const encrypted = text.map(chunk => rsa.encrypt(chunk))
      const message = {}
      message[timeStamp] = {
        text: encrypted,
        sender: this.props.user.uid,
      }
      //send message
      firebase
        .database()
        .ref(
          `Users/${member.uid}/${
            //write to your id field in their db entry or their id field in your db entry in 1-1, or the groupconvo id in gchat
            this.state.uid === member.uid ? this.props.user.uid : this.state.uid
          }/conversation`,
        )
        .update(message)
    })
    if (this.state.startsConvo) {
      this.updateMembers()
      this.setState({startsConvo: false})
    }
  }

  // this whole mess is because RSA can only encrypt
  // strings less than 117 characters long
  splitterForRSA = message => {
    const messageChunks = []
    let tracker = 0
    while (tracker < message.length) {
      messageChunks.push(message.slice(tracker, tracker + 117))
      tracker += 117
    }
    return messageChunks
  }

  updateMembers = () => {
    this.state.members.forEach(member => {
      firebase
        .database()
        .ref(
          `Users/${member.uid}/${
            //write to your id field in their db entry or their id field in your db entry in 1-1, or the groupconvo id in gchat
            this.state.uid === member.uid ? this.props.user.uid : this.state.uid
          }/members`,
        )
        .set(this.state.members)
    })
  }

  //should also run onPress for a button for adding members
  //needs functions for pushing new members into this.state.members
  //also slicing them out
  //also a whole sub-comp similar to the contacts arr where you can add members
  //or cancel the add
  //Or we could just not support adding people to groups.

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <ImageBackground
          style={{flex: 1}}
          source={require('../../../Public/bgtile.png')}
          resizeMode="repeat"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {this.props.messages[this.state.uid] ? (
              <ReversedFlatList
                style={styles.chats}
                data={this.props.messages[this.state.uid].conversation}
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
            style={[styles.input, {height: this.state.height}]}
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
              this.setState({newMessage: '', height: 29.5})
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            disabled={this.state.newMessage.length === 0}
            onPress={() => {
              this.sendMessage()
              this.setState({newMessage: '', height: 29.5})
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
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
