import React, {Component} from 'react'
import {View, Button} from 'react-native'
import {connect} from 'react-redux'

import Chat from './Chat'

import firebase from 'react-native-firebase'

class AllChats extends Component {
  componentDidMount() {
    const uid = this.props.user.uid
    const userRef = firebase.database().ref(`/Users/${uid}`)
    userRef.off()
    userRef.once('value', snapshot => {
      const user = snapshot.val()
      for (let key in user) {
        if (typeof user[key] === 'object') {
          const ref = firebase.database().ref(`/Users/${uid}/${key}`)
          ref.off()
          ref.on('child_added', snapshot => {})

          //some BS to fetch the last 20 messages in the object the ref points to
          //some BS to update the user's specific conversation
          //eventually we'll need some bs to load messages 21-40 and 41-60 etc if they scroll up, probably in the singlechat component
        }
      }
    })
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  componentWillUnmount() {}

  render() {
    return (
      <View>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
        <Chat />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllChats)
