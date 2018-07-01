import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'
const RSAKey = require('react-native-rsa')

import {getNewMessage, getUser, populateContacts} from '../store/actions'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRef: null,
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.populateContacts()
    const uid = this.props.uid
    const userRef = firebase.database().ref(`/Users/${uid}`)
    userRef.off()
    userRef.on('child_added', async snapshot => {
      const userField = {}
      if (
        snapshot.key !== 'displayName' &&
        snapshot.key !== 'phoneNumber' &&
        snapshot.key !== 'publicKey' &&
        snapshot.key !== 'uid'
      ) {
        userField[snapshot.key] = await this.convertToArrAndDecrypt(
          snapshot.val(),
        )
      } else {
        userField[snapshot.key] = snapshot.val()
      }
      this.props.getUser(userField)
    })
    userRef.on('child_changed', async snapshot => {
      try {
        const conversation = await this.convertToArrAndDecrypt(snapshot.val())
        const chatId = snapshot.key
        this.props.getNewMessage(conversation, chatId)
      } catch (error) {
        console.log(error)
      }
    })
    this.setState({
      userRef,
    })
  }

  convertToArrAndDecrypt = async obj => {
    let privateKey = ''
    try {
      privateKey = await AsyncStorage.getItem('privateKey')
      const arr = []
      const rsa = new RSAKey()
      rsa.setPrivateString(privateKey)
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const message = {...obj[key], timeStamp: key}
          message.text = rsa.decrypt(message.text)
          arr.push(message)
        }
      }
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
})

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
  populateContacts: () => dispatch(populateContacts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)
