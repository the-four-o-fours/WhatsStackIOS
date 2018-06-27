import React from 'react'
import {View, Button} from 'react-native'

import Chat from './Chat'

import firebase from 'react-native-firebase'

const AllChats = () => {
  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <View>
      <Button title="Sign Out" color="red" onPress={signOut} />
      <Chat />
    </View>
  )
}

export default AllChats
