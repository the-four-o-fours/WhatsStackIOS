import React, {Component} from 'react'
import {View, Button} from 'react-native'
import {connect} from 'react-redux'

import firebase from 'react-native-firebase'

import {getNewMessage} from '../../store/actions'

class AllChats extends Component {
  componentDidMount() {}

  getNewMessageCallBack = (snapshot, prevChildKey) => {
    const messageObj = {...snapshot.val()}
    messageObj.timeStamp = snapshot.key
    console.log(messageObj)
    console.log('prevChild', prevChildKey)
  }

  componentWillUnmount() {}

  signOut = () => {
    firebase.auth().signOut()
  }

  goToConvo = uid => {
    this.props.navigation.navigate('Chat', {
      uid,
    })
  }

  render() {
    return (
      <View>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
        <Button title="Sign Out" color="red" onPress={this.goToConvo} />
        <Button title="Sign Out" color="red" onPress={this.goToConvo} />
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
