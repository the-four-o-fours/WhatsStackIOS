import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  AsyncStorage,
} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

class ContactsComponent extends Component {
  state = {
    contacts: {},
  }

  async componentDidMount() {
    const phoneContacts = await this.getContacts()
    // manually adding contacts to test
    phoneContacts['+19178647990'] = 'Chloe Chong'
    phoneContacts['+19292923456'] = 'Gabriel Lebec'

    const databaseContacts = await this.checkDatabaseContacts()
    const contacts = this.whatsStackUser(databaseContacts, phoneContacts)

    this.setState({contacts}, () => console.log(this.state.contacts))
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
        firebaseContacts.push({
          displayName: childData.displayName,
          phoneNumber: childData.phoneNumber,
          uid: childData.uid,
          publicKey: childData.publicKey,
        })
      }),
    )
    return firebaseContacts
  }

  whatsStackUser = (databaseContacts, phoneContacts) => {
    const users = []
    databaseContacts.forEach(user => {
      const number = user.phoneNumber
      if (phoneContacts[number]) {
        user.phoneName = phoneContacts[number]
        users.push(user)
        AsyncStorage.setItem(user.displayName, JSON.stringify(user))
      }
    })
    return users
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.contacts.length && (
          <View>
            {this.state.contacts.map(contact => (
              <Text key={contact.uid}>
                {contact.displayName} ({contact.phoneName
                  ? contact.phoneName
                  : ''})
              </Text>
            ))}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
  },
})

export default ContactsComponent
