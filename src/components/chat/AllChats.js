import React, {Component} from 'react'
import {View, Button} from 'react-native'
import {connect} from 'react-redux'

import Chat from './Chat'

import firebase from 'react-native-firebase'

class AllChats extends Component {
  componentDidMount() {
    const uid = this.props.user.uid
    const firebaseRef = firebase.database().ref(`/Users/${uid}`)
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
