import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import MainNavigator from './MainNavigator'

import {getNewMessage} from '../store/actions'

class MainContainer extends Component {
  componentDidMount() {
    const uid = this.props.uid
    const userRef = firebase.database().ref(`/Users/${uid}`)
    userRef.off()
    userRef.on('child_added', snapshot => {
      if (Object.keys(snapshot).length > 1) {
        // a redux function to set the user in the store to snapshot.val()
      } else {
        //a redux function to add a new conversation to the user in the store, set to snapshot.val()
      }
      console.log('child added', snapshot.val())
      console.log('key', snapshot.key)
    })
    userRef.on('child_changed', snapshot => {
      // add something to take only the last child
      // add that last child to the correct conversation in user in store using parent's key
      console.log('Child changed', snapshot.val())
      console.log("Parent's key", snapshot.key)
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
