import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'

import {connect} from 'react-redux'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverUid: '',
      messages: [],
      newMessage: '',
    }
  }

  componentDidMount() {
    console.log(this.props.user)
    const receiverUid = this.props.navigation.getParam('uid', false)
    const messages = this.convertToArr(this.props.user[receiverUid])
    this.setState({
      receiverUid,
      messages,
    })
  }

  convertToArr = obj => {
    const arr = []
    for (let key in obj) {
      const message = {...obj[key]}
      message.timeStamp = key
      arr.push(message)
    }
    arr.sort((a, b) => a.timeStamp - b.timeStamp)
    return arr
  }

  sendMessage = () => {
    const text = this.state.newMessage
    const user = this.props.user
    const receiverUid = this.state.receiverUid
    if (!receiverUid) {
      console.log("could not get receiver's uid")
    }
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
    const sentAt = Date.now()
    const senderRef = firebase
      .database()
      .ref(`Users/${user.uid}/${receiverUid}`)
    const receiverRef = firebase
      .database()
      .ref(`Users/${receiverUid}/${user.uid}`)
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

  handleChange = event => {
    console.log(event)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    console.log(this.state.messages)
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
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
