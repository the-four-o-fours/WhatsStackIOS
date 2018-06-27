import React from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'

import firebase from 'react-native-firebase'

const AllChats = () => {
  const signOut = () => {
    firebase.auth().signOut()
  }
  return (
    <View>
      <Button title="Sign Out" color="red" onPress={signOut} />
      <Text>AllChats Component</Text>
    </View>
  )
}

export default AllChats
