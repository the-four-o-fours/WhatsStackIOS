import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, Text, TextInput, Image, Button} from 'react-native'
import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

import {getContacts} from '../../store/actions'

class ContactsComponent extends Component {
  async componentDidMount() {
    const firebaseUsers = await this.getAllUsers()
    const contactsObj = await this.getAllContacts()
    const contacts = this.findOverlap(firebaseUsers, contactsObj)
    this.props.getContacts(contacts)
  }

  getAllContacts = () => {
    return new Promise((resolve, reject) => {
      Contacts.getContacts((err, contacts) => {
        if (err) return reject(err)
        const contactsObj = {}
        contacts.filter(contact => contact.phoneNumbers[0]).forEach(contact => {
          const phoneNumber = `+1` + contact.phoneNumbers[0].digits
          contactsObj[phoneNumber] = contact.fullName
        })
        resolve(contactsObj)
      })
    })
  }

  getAllUsers = async () => {
    const firebaseUsers = []
    const snapshot = await firebase
      .database()
      .ref(`/Users/`)
      .once('value')
    snapshot.forEach(childSnap => {
      const childData = childSnap.val()
      firebaseUsers.push({
        displayName: childData.displayName,
        phoneNumber: childData.phoneNumber,
        uid: childData.uid,
        publicKey: childData.publicKey,
      })
    })
    return firebaseUsers
  }

  findOverlap = (firebaseUsers, contactsObj) => {
    const users = []
    firebaseUsers.forEach(user => {
      if (contactsObj[user.phoneNumber]) {
        user.phoneName = contactsObj[user.phoneNumber]
        users.push(user)
      }
    })
    return users
  }

  signOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
        {this.props.contacts.length && (
          <View>
            {this.props.contacts.map(contact => (
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

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  getContacts: contacts => dispatch(getContacts(contacts)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsComponent)
