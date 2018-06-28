import React from 'react'
import {View, Button} from 'react-native'

import Chat from './Chat'

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
      <Chat />
    </View>
  )
}

export default AllChats
