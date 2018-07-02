import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'

import rsa from '../../rsa'
import {seenMessages} from '../../../store/actions'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receiverUid: '',
      newMessage: '',
      height: 24
    }
  }

  componentDidMount() {
    const receiverUid = this
      .props
      .navigation
      .getParam('uid', false)
    this.setState({receiverUid})
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.receiverUid]) {
      this
        .props
        .seenMessages(this.state.receiverUid)
    }
  }

  sendMessage = () => {
    Keyboard.dismiss()
    const text = this.state.newMessage
    const user = this.props.user
    const receiver = this.props.contactsHash[this.state.receiverUid]
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
  }

  render() {
    const receiverUid = this.state.receiverUid
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}>
        <TouchableWithoutFeedback
          onPress={() => {
          Keyboard.dismiss()
        }}>
          <ScrollView>
            {this.props.messages[receiverUid]
              ? (this.props.messages[receiverUid].conversation.map(message => (
                <Text
                  key={message.timeStamp}
                  style={{
                  color: 'black'
                }}>
                  {message.text}
                </Text>
              )))
              : (
                <Text>No Messages</Text>
              )}
          </ScrollView>
        </TouchableWithoutFeedback>
        <TextInput
          style={[
          styles.input, {
            height: this.state.height
          }
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
          this.setState({height: event.nativeEvent.contentSize.height})
        }}
          onSubmitEditing={() => {
          this.sendMessage();
          this.setState({newMessage: '', height: 16})
        }}/>
      </KeyboardAvoidingView>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 24
  }
})

const mapStateToProps = state => ({user: state.user, contactsHash: state.contactsHash, messages: state.messages})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId))
})

export default connect(mapStateToProps, mapDispatchToProps,)(Chat)
