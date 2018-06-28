import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {StyleSheet, Text, AsyncStorage, View} from 'react-native'
import {Container, Button, Form, Item, Input} from 'native-base'
const moment = require('moment')

class Chat extends Component {
  constructor() {
    super()

    this.state = {
      messages: [],
      uid: '',
    }
  }

  componentDidMount() {
    const {uid, phoneNumber} = firebase.auth().currentUser
    this.setState({uid})
    this.listener()
  }

  sendMessage = text => {
    const senderMessage = {
      text,
      sender: true,
      group: false,
    }
    const receiverMessage = {
      text,
      sender: false,
      group: false,
    }
    const sentAt = moment(Date.now())
    const chloeRef = firebase
      .database()
      .ref('Users/ME8NBZ125PbgVrJVCWVma2mCbnF2/P0xLKKiHwNfP1asdgX8blSq8pMa2') //chloe's ID / my ID //un-hard-code eventually
    const spencerRef = firebase
      .database()
      .ref('Users/P0xLKKiHwNfP1asdgX8blSq8pMa2/ME8NBZ125PbgVrJVCWVma2mCbnF2') //my ID / chloe's ID //un-hard-code eventually
    const senderMessageObj = {}
    const receiverMessageObj = {}
    senderMessageObj[sentAt] = senderMessage
    receiverMessageObj[sentAt] = receiverMessage
    chloeRef.update(senderMessageObj)
    spencerRef.update(receiverMessageObj)
  }

  listener = () => {
    const conversationRef = firebase
      .database()
      .ref('Users/ME8NBZ125PbgVrJVCWVma2mCbnF2/P0xLKKiHwNfP1asdgX8blSq8pMa2') //chloe-me convo
    conversationRef.on('value', snapshot => {
      const messages = []
      snapshot.forEach(message => {
        const messageObj = {}
        messageObj[message.key] = message.val()
        messages.push(messageObj)
      })
      this.setState({
        messages,
      })
    })
  }

  render() {
    return (
      <View>
        {/* <Text>{this.sendMessage('Hello1')}<Text> */}
        <Text>Chat Component</Text>
        {this.state.messages.map(message => (
          <Text key={Object.keys(message)[0]}>
            {message[Object.keys(message)[0]].text}
          </Text>
        ))}
      </View>
    )
  }
}

export default Chat
