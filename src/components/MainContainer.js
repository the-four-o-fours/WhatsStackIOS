import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'
import rsa from './rsa'

import {
  getNewMessage,
  getUser,
  getMessages,
  getGroupMessages,
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
      //handles group messages
      if (snapshot.key.length === 28 && snapshot.key.slice(0, 5) === 'GROUP') {
        const convoObj = {}
        convoObj[snapshot.key] = {}
        convoObj[
          snapshot.key
        ].conversation = await this.JoinDecryptAndConvertToArr(
          snapshot.val().conversation,
        )
        convoObj[snapshot.key].members = snapshot.val().members
        convoObj[snapshot.key].seen = true
        this.props.getGroupMessages(convoObj)
        //this condition populates the messages field in the store with actual message histories, not user data
      } else if (snapshot.key.length === 28) {
        const convoObj = {}
        convoObj[snapshot.key] = {}
        convoObj[
          snapshot.key
        ].conversation = await this.JoinDecryptAndConvertToArr(snapshot.val())
        convoObj[snapshot.key].seen = true
        this.props.getMessages(convoObj)
        //when you first connect to the database, all pre-existing fields come in as being newly added children
        //we take advantage of this to populate the user field in the store with up to date info
      } else if (snapshot.key !== 'img') {
        const userField = {}
        userField[snapshot.key] = snapshot.val()
        this.props.getUser(userField)
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateOnNewMessageOrNameChange = async snapshot => {
    //both these events trigger a "child changed"
    try {
      //listening for a changed name
      if (snapshot.key === 'displayName') {
        this.props.getUser({[snapshot.key]: snapshot.val()})
        //listening for a new groupchat
      } else if (
        snapshot.key.length === 28 &&
        snapshot.key.slice(0, 5) === 'GROUP'
      ) {
        const conversation = await this.JoinDecryptAndConvertToArr(
          snapshot.val().conversation,
        )
        const chatId = snapshot.key
        this.props.getNewMessage(conversation, chatId)
        // listening for a new regular chat
      } else if (snapshot.key !== 'img') {
        //listening for a new message being added to an existing conversation
        const conversation = await this.JoinDecryptAndConvertToArr(
          snapshot.val(),
        )
        const chatId = snapshot.key
        this.props.getNewMessage(conversation, chatId)
      }
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    this.state.userRef.off()
  }

  render() {
    return <MainNavigator />
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contactsArr: state.contactsArr,
  contactsHash: state.contactsHash,
  messages: state.messages,
})

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
  getMessages: messages => dispatch(getMessages(messages)),
  getGroupMessages: groupMessages => dispatch(getGroupMessages(groupMessages)),
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
  populateContacts: () => dispatch(populateContacts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)
