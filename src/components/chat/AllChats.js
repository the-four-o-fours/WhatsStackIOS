import React from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'

import firebase from 'react-native-firebase'


import AllChatsList from './SectionList/AllChatsList'
import Header from './AllChats/Header';

const AllChats = () => {
  const signOut = () => {
    firebase.auth().signOut()
  }
  return (
    <View>
      <Button title="Sign Out" color="red" onPress={signOut} />
      <AllChatsList />
      <Text>AllChats Component</Text>
    </View>
  )
}

export default AllChats
