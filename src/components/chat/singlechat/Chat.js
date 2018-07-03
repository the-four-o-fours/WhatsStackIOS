import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'

import ReversedFlatList from 'react-native-reversed-flat-list'
import ChatBubble from './ChatBubble'
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
      height: 24,
    }
  }

  componentDidMount() {
    const receiverUid = this.props.navigation.getParam('uid', false)
    this.setState({receiverUid})
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.receiverUid]) {
      this.props.seenMessages(this.state.receiverUid)
    }
  }

  // this whole mess is because RSA can only encrypt strings less than 117
  // characters long
  splitterForRSA = string => {
    const messageChunks = []
    let tracker = 0
    while (tracker < string.length) {
      messageChunks.push(string.slice(tracker, tracker + 117))
      tracker += 117
    }
    return messageChunks
  }

  sendMessage = () => {
    Keyboard.dismiss()
    const text = this.splitterForRSA(this.state.newMessage)
    const user = this.props.user
    const receiver = {
      uid: this.state.receiverUid,
      publicKey: this.props.navigation.getParam('publicKey'),
    }
    rsa.setPublicString(user.publicKey)
    const senderCopy = text.map(chunk => rsa.encrypt(chunk))
    rsa.setPublicString(receiver.publicKey)
    const receiverCopy = text.map(chunk => rsa.encrypt(chunk))
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
  }

  extractKey = ({timestamp}) => timestamp
  renderItem = ({item}) => {
    return <ChatBubble style={styles.chatBubble} message={item} />
  }

  render() {
    const receiverUid = this.state.receiverUid
    console.log(this.props.messages[receiverUid])
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}
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
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          ) : (
            <Text>No Messages</Text>
          )}
        </TouchableWithoutFeedback>
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
            this.setState({height: event.nativeEvent.contentSize.height})
          }}
          onSubmitEditing={() => {
            this.sendMessage()
            this.setState({newMessage: '', height: 16})
          }}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chats: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderTopWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 24,
  },
})

const mapStateToProps = state => ({user: state.user, messages: state.messages})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
