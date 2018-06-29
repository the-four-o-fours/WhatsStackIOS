import React, {Component} from 'react'

import firebase from 'react-native-firebase'
import MainContainer from './chat/MainContainer'
import {Text} from 'react-native'

class Main extends Component {
  componentDidMount() {
    const user = firebase.auth().currentUser
    if (!user) this.props.navigation.navigate('Login')
  }
  render() {
    if (firebase.auth().currentUser) {
      return <MainContainer />
    } else {
      return <Text>WhatsStack</Text>
    }
  }
}

export default Main
