import React from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
const RSAKey = require('react-native-rsa')

import {connect} from 'react-redux'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverUid: '',
      messages: [],
      newMessage: '',
      rsa: {},
    }
  }

  componentDidMount() {
    const receiverUid = this.props.navigation.getParam('uid', false)
    const messages = this.props.user[receiverUid]
    const rsa = new RSAKey()
    this.setState({
      receiverUid,
      messages,
      rsa,
    })
  }

  sendMessage = () => {
    const text = this.state.newMessage
    const user = this.props.user
    console.log(user)
    const receiver = this.props.contacts.filter(
      contact => contact.uid === this.state.receiverUid,
    )[0]
    console.log(receiver)
    const rsa = this.state.rsa
    rsa.setPublicString(user.publicKey)
    const senderCopy = rsa.encrypt(text)
    rsa.setPublicString(receiver.publicKey)
    const receiverCopy = rsa.encrypt(text)
    const senderMessage = {
      text: senderCopy,
      sender: true,
      group: false,
    }
    const receiverMessage = {
      text: receiverCopy,
      sender: false,
      group: false,
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
    this.setState({
      newMessage: '',
    })
  }

  render() {
    console.log('this.state within chat comp', this.state)
    return (
      <View>
        <Text>Chat Component</Text>
        {this.state.messages.map(message => (
          <Text key={message.timeStamp} style={{color: 'black'}}>
            {message.text}
          </Text>
        ))}
        <TextInput
          placeholder="Do I exist"
          name="newMessage"
          value={this.state.newMessage}
          onChangeText={newMessage => this.setState({newMessage})}
        />
        <TouchableOpacity onPress={this.sendMessage}>
          <Text>SEND THAT MESSAGE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
