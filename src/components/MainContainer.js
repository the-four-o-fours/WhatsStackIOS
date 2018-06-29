import React, {Component} from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'

import {getNewMessage} from '../store/actions'

class MainContainer extends Component {
  componentDidMount() {
    const uid = this.props.user.uid
    const userRef = firebase.database().ref(`/Users/${uid}`)
    userRef.off()
    userRef.on('child_added', snapshot => {
      if (snapshot.key.length > 12)
        // check child is a new conversation
        console.log('key', snapshot.key)
      console.log('child added', snapshot.val())
    })
    userRef.on('child_changed', snapshot => {
      console.log('Child changed', snapshot.val())
    })
  }

  componentWillUnmount() {}
  render() {
    return <MainNavigator />
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)
