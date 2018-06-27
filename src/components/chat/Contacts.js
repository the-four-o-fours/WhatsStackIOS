import React, {Component} from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

class ContactsComponent extends Component {
  state = {
    contacts: {},
  }

  getContacts = () => {
    Contacts.getContacts((err, contacts) => {
      if (err) throw err
      else console.log(contacts)
    })
  }

  checkPermission = () => {
    Contacts.checkPermission((err, permission) => {
      if (err) throw err
      console.log('permission', permission)
      console.log('error', err)
    })
  }
  render() {
    console.log(Contacts)
    return (
      <View>
        <Button title="Permission" color="red" onPress={this.checkPermission} />
        <Button title="Get Contacts" color="red" onPress={this.getContacts} />
        <Text>Contacts Component</Text>
      </View>
    )
  }
}
// = () => {
//   const signOut = () => {
//     firebase.auth().signOut()
//   }
//   const getContacts = () => {
//     Contacts.getContacts((err, contacts) => {
//       if (err) {
//         console.error(err)
//       } else {
//         console.log(contacts)
//       }
//     })
//   }
//   console.log('Contactss?', Contacts)
//   return (
//     <View>
//       <Button title="contacts" onPress={getContacts} />
//       <Button title="Sign Out" color="red" onPress={signOut} />
//       <Text>Contacts Component</Text>
//     </View>
//   )
// }

export default ContactsComponent
