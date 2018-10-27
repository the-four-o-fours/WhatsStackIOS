import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'
import {rsa} from '../logic'

import {
  getMessages,
  getNewMessage,
  getUser,
  populateContacts,
} from '../store/actions'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRef: null,
    }
  }

  componentDidMount() {
    this.props.populateContacts()
    const uid = this.props.uid
    const userRef = firebase.database().ref(`/Users/${uid}`)
    userRef.off()
    userRef.on('child_added', snapshot =>
      this.populateStoreAndListenForNewConversation(snapshot),
    )
    userRef.on('child_changed', snapshot =>
      this.updateOnNewMessageOrNameChange(snapshot),
    )
    this.setState({
      userRef,
    })
  }

  populateStoreAndListenForNewConversation = async snapshot => {
    try {
      if (snapshot.key.length >= 28) {
        //handles messages
        const chatId = snapshot.key
        const members = snapshot.val().members
        const conversation = await this.JoinDecryptAndConvertToArr(
          snapshot.val().conversation,
        )
        this.props.getMessages(chatId, members, conversation)
      } else if (snapshot.key !== 'img') {
        //when you first connect to the database, all pre-existing fields come in as being newly added children
        //we take advantage of this to populate the user field in the store with up to date info
        const userField = {}
        userField[snapshot.key] = snapshot.val()
        this.props.getUser(userField)
      }
    } catch (err) {
      console.log(err)
    }
  }

  updateOnNewMessageOrNameChange = async snapshot => {
    //both these events trigger a "child changed"
    try {
      if (snapshot.key === 'displayName') {
        //listening for changed name
        this.props.getUser({[snapshot.key]: snapshot.val()})
      } else if (snapshot.key !== 'img') {
        //listening for new messages
        const chatId = snapshot.key
        const members = snapshot.val().members
        const conversation = await this.JoinDecryptAndConvertToArr(
          snapshot.val().conversation,
        )
        this.props.getNewMessage(chatId, members, conversation)
      }
    } catch (err) {
      console.log(err)
    }
  }

  JoinDecryptAndConvertToArr = async conversation => {
    try {
      const privateKey = await AsyncStorage.getItem('privateKey')
      rsa.setPrivateString(privateKey)
      const arr = []
      Object.keys(conversation).forEach(key => {
        const message = {...conversation[key], timeStamp: key}
        message.text = message.text.map(chunk => rsa.decrypt(chunk)).join('')
        arr.push(message)
      })
      arr.sort((a, b) => a.timeStamp - b.timeStamp)
      return arr
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    this.state.userRef.off()
  }

  render() {
    return <MainNavigator />
  }
}

const mapDispatchToProps = dispatch => ({
  getMessages: (conversation, members, chatId) =>
    dispatch(getMessages(conversation, members, chatId)),
  getNewMessage: (conversation, members, chatId) =>
    dispatch(getNewMessage(conversation, members, chatId)),

  getUser: user => dispatch(getUser(user)),
  populateContacts: () => dispatch(populateContacts()),
})

export default connect(
  null,
  mapDispatchToProps,
)(MainContainer)
