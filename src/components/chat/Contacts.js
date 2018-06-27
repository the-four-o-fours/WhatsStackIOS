import React from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

const ContactsComponent = () => {
  const signOut = () => {
    firebase.auth().signOut()
  }
  console.log('Contactss?', Contacts)
  return (
    <View>
      <Button title="Sign Out" color="red" onPress={signOut} />
      <Text>Contacts Component</Text>
    </View>
  )
}

export default ContactsComponent
