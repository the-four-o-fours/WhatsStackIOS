import React, {Component} from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

class ContactsComponent extends Component {
  state = {
    contacts: {},
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts = () => {
    Contacts.getContacts((err, contacts) => {
      if (err) {
        throw err
      } else {
        contacts = contacts.map(contact => {
          const keep = {}
          keep.displayName = contact.givenName
          keep.phoneNumber = `+1` + contact.phoneNumbers[0].digits
          return keep
        })
        this.setState({contacts})
      }
    })
  }

  render() {
    console.log(Contacts)
    console.log(firebase.auth().currentUser)
    return (
      <View>
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
