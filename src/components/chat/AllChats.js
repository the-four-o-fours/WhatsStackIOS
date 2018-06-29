import React, {Component} from 'react'
import {View, Button} from 'react-native'
import {connect} from 'react-redux'

import Chat from './Chat'

import firebase from 'react-native-firebase'

import {getNewMessage} from '../../store/actions'

class AllChats extends Component {
  componentDidMount() {
    const uid = this.props.user.uid
    // const userRef = firebase.database().ref(`/Users/${uid}`)
    // userRef.off()
    // userRef.on('child_added', snapshot => {
    //   console.log('key', snapshot.key)
    //   console.log('child added', snapshot.val())
    // })
    // userRef.on('child_changed', snapshot => {
    //   console.log('Child changed', snapshot.val())
    // })

    // Get chatIds from user object in redux then listen to each one
    // userRef.once('value', snapshot => {
    //   const user = snapshot.val()
    //   for (let key in user) {
    //     if (typeof user[key] === 'object') {
    //       const ref = firebase.database().ref(`/Users/${uid}/${key}`)
    //       ref.off()
    //       ref.on('child_added', this.getNewMessageCallBack())
    //     }
    //   }
    // })
  }

  getNewMessageCallBack = (snapshot, prevChildKey) => {
    const messageObj = {...snapshot.val()}
    messageObj.timeStamp = snapshot.key
    console.log(messageObj)
    console.log('prevChild', prevChildKey)
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  componentWillUnmount() {}

  render() {
    return (
      <View>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
        {/* <Chat /> */}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllChats)
