import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native'
import {
  Content,
  Button,
  Form,
  Item,
  Input,
  Footer
} from 'native-base'
import {Col, Row, Grid} from "react-native-easy-grid";
import {GiftedChat} from 'react-native-gifted-chat'
const moment = require('moment')

import ChatItem from './ChatItem'

class Chat extends Component {
  constructor() {
    super()

    this.state = {
      message: '',
      messages: [],
      uid: ''
    }
  }

  componentDidMount() {
    const {uid, phoneNumber} = firebase
      .auth()
      .currentUser
    this.setState({uid})
    this.listener()
  }

  sendMessage = text => {
    const senderMessage = {
      text,
      sender: true,
      group: false
    }
    const receiverMessage = {
      text,
      sender: false,
      group: false
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
      this.setState({messages})
    })
  }

  onChangeHandler = (val) => {
    this.setState({message: val})
    console.log('here we are', this.state.message)
  }

  onSubmitHandler = () => {
    //sendMessage(this.state.message)
    alert(this.state.messasge)
  }

  render() {
    console.log('uid', this.state.uid)
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={90}>
            <View>
              <ChatItem messages={this.state.messages}/>
            </View>
          </Row>
          <Row size={10}>
            <Grid>
              <Row>
                <Col size={85}>
                  <Content>
                    <Item>
                      <Input placeholder="Enter Message" onChange={this.onChangeHandler}/>
                    </Item>
                  </Content>
                </Col>
                <Col size={15}>
                  <Button
                    block
                    success
                    style={styles.submitBtn}
                    onPress={this.placeSubmnitHandler}>
                    <Text style={{
                      color: '#fff'
                    }}>Send</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  inputContainer: {
    flex: 1,
    // width: "100%", flexDirection: "row", justifyContent: "space-between",
    // alignItems: "center"
  },
  textInput: {
    // width: "85%"
    margin: 5
  },
  submitBtn: {
    width: "100%",
    color: "#fff"
  }
});

export default Chat
