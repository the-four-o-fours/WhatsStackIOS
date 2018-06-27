import React from 'react'

import firebase from 'react-native-firebase'

import Login from './auth/Login'
import AllChats from './chat/AllChats'

const Main = props => {
  const user = firebase.auth().currentUser
  if (user) {
    return <AllChats navigation={props.navigation} />
  } else {
    return <Login navigation={props.navigation} />
  }
}

export default Main
