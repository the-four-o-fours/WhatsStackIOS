import React from 'react'
import {Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'
const RSAKey = require('react-native-rsa')

import {seenMessages} from '../../../store/actions'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverUid: '',
      newMessage: '',
      rsa: {}
    }
  }

  componentDidMount() {
    const receiverUid = this
      .props
      .navigation
      .getParam('uid', false)
    const rsa = new RSAKey()
    this.setState({receiverUid, rsa})
  }

  componentWillUnmount() {
    this
      .props
      .seenMessages(this.state.receiverUid)
  }

  sendMessage = () => {
    const text = this.state.newMessage
    const user = this.props.user
    const receiver = this.props.contactsHash[this.state.receiverUid]
    const rsa = this.state.rsa
    rsa.setPublicString(user.publicKey)
    const senderCopy = rsa.encrypt(text)
    rsa.setPublicString(receiver.publicKey)
    const receiverCopy = rsa.encrypt(text)
    const senderMessage = {
      text: senderCopy,
      sender: true,
      group: false
    }
    const receiverMessage = {
      text: receiverCopy,
      sender: false,
      group: false
    }
    const sentAt = Date.now()
    const senderRef = firebase
      .database()
      .ref(`Users/${user.uid}/${receiver.uid}`)
    const receiverRef = firebase
      .database()
      .ref(`Users/${receiver.uid}/${user.uid}`)
    const senderMessageObj = {}
    const receiverMessageObj = {}
    senderMessageObj[sentAt] = senderMessage
    receiverMessageObj[sentAt] = receiverMessage
    senderRef.update(senderMessageObj)
    receiverRef.update(receiverMessageObj)
    this.setState({newMessage: ''})
  }

  render() {
    const receiverUid = this
      .props
      .navigation
      .getParam('uid', false)
    return (
      <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset={64}>
        <ScrollView>
          {this
            .props
            .messages[receiverUid]
            .conversation
            .map(message => (
              <Text
                key={message.timeStamp}
                style={{
                color: 'black'
              }}>
                {message.text}
              </Text>
            ))}
          <TextInput
            autoFocus={false}
            placeholder="..."
            value={this.state.newMessage}
            onChangeText={newMessage => this.setState({newMessage})}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={this.sendMessage}/>
          <TouchableOpacity
            onPress={this.sendMessage}
            disabled={!this.state.newMessage.length}>
            <Text>SEND THAT MESSAGE</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({user: state.user, contactsHash: state.contactsHash, messages: state.messages})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId))
})

export default connect(mapStateToProps, mapDispatchToProps,)(Chat)
