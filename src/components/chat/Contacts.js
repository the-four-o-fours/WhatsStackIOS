import React, {Component} from 'react'
import {View, Button, Text, TextInput, Image} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

class ContactsComponent extends Component {
  state = {
    contacts: {},
  }

  async componentDidMount() {
    const phoneContacts = await this.getContacts()
    phoneContacts['+19178647990'] = 'Chloe Chong'
    phoneContacts['+19292923456'] = 'Gabriel Lebec'
    console.log(phoneContacts)
  }

  getContacts = () => {
    const phoneContacts = {}
    Contacts.getContacts((err, contacts) => {
      if (err) return console.error(err)
      contacts.filter(contact => contact.phoneNumbers[0]).forEach(contact => {
        const phoneNumber = `+1` + contact.phoneNumbers[0].digits
        phoneContacts[phoneNumber] = contact.fullName
      })
    })
    return phoneContacts
  }

  checkDatabaseContacts = async () => {
    const firebaseUsers = firebase.database().ref(`/Users/`)
    const firebaseContacts = []
    await firebaseUsers.once('value', snapshot =>
      snapshot.forEach(childSnap => {
        const childData = childSnap.val()
        firebaseContacts.push({...childData})
      }),
    )
    console.log('dtabase', firebaseContacts)
  }

  whatsStackUser = (database, phone) => {
    const users = []
  }

  render() {
    console.log(Contacts)
    return (
      <View>
        <Button
          title="Get Contacts"
          color="red"
          onPress={this.checkDatabaseContacts}
        />
        <Text>Contacts Component</Text>
      </View>
    )
  }
}

export default ContactsComponent
