import React, {Component} from 'react'
import firebase from 'react-native-firebase';
import {StyleSheet, Text, AsyncStorage, View} from 'react-native';
import {Container, Button, Form, Item, Input} from 'native-base';
const moment = require('moment')

class Chat extends Component {
  constructor() {
    super()

    this.state = {
      messages: '',
      uid: ''
    }
  }

  componentDidMount() {
    const {uid, phoneNumber} = firebase
      .auth()
      .currentUser;
    this.setState({uid});

  }

  sendMessage = text => {
    console.log("sendmessage reached")
    const myMessage = {
      text,
      sender: true,
      group: false
    }
    const recipientMessage = {
      text,
      sender: false,
      group: false
    }

    const sentAt = moment(Date.now())
    const nousitRef = firebase
      .database()
      .ref('Users/oRag3daBrTeXDXv70LUngnnM9eV2/3q2Pf5aMjeWuEi2TK8sNX6LrB3F3') //Nousit's ID / my ID //un-hard-code eventually
    const spencerRef = firebase
      .database()
      .ref('Users/3q2Pf5aMjeWuEi2TK8sNX6LrB3F3/oRag3daBrTeXDXv70LUngnnM9eV2') //my ID / Nousit's ID //un-hard-code eventually
    const senderMessageObj = {}
    const receiverMessageObj = {}
    senderMessageObj[sentAt] = myMessage
    receiverMessageObj[sentAt] = recipientMessage
    nousitRef.update(senderMessageObj)
    spencerRef.update(receiverMessageObj)
  }

  render() {

    return (
      <View>
        <Text>{this.sendMessage('Hello thing!')}</Text>
      </View>
    )
  }
}

export default Chat
