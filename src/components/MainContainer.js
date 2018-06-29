import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'

import {getNewMessage, getUser, populateContacts} from '../store/actions'

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
    userRef.on('child_added', snapshot => {
      const userField = {}
      userField[snapshot.key] = snapshot.val()
      this.props.getUser(userField)
    })
    userRef.on('child_changed', snapshot => {
      const conversation = snapshot.val()
      const chatId = snapshot.key
      this.props.getNewMessage(conversation, chatId)
    })
    this.setState({
      userRef,
    })
  }

  componentWillUnmount() {
    this.state.userRef.off()
  }

  render() {
    return <MainNavigator />
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
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
