import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

export const GOT_CONTACTS = 'GOT_CONTACTS'

const getContacts = contacts => ({
  type: GOT_CONTACTS,
  contacts,
})

const getAllContacts = () => {
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

const getAllUsers = async () => {
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

const findOverlap = (firebaseUsers, contactsObj) => {
  const users = []
  firebaseUsers.forEach(user => {
    if (contactsObj[user.phoneNumber]) {
      user.phoneName = contactsObj[user.phoneNumber]
      users.push(user)
    }
  })
  return users
}

export const populateContacts = () => async dispatch => {
  const firebaseUsers = await getAllUsers()
  const contactsObj = await getAllContacts()
  const contacts = findOverlap(firebaseUsers, contactsObj)
  dispatch(getContacts(contacts))
}
