import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'

export const GOT_CONTACTS = 'GOT_CONTACTS'
export const GOT_CONTACTS_HASH = 'GOT_CONTACTS_HASH'

const getContacts = contacts => ({
  type: GOT_CONTACTS,
  contacts,
})

const getContactsHash = contacts => ({
  type: GOT_CONTACTS_HASH,
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
  try {
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
  } catch (error) {
    console.log(error)
  }
}

const findOverlap = (firebaseUsers, contactsObj) => {
  const users = []
  const contactsHash = {}
  firebaseUsers.forEach(user => {
    if (contactsObj[user.phoneNumber]) {
      user.phoneName = contactsObj[user.phoneNumber]
      users.push(user)
      contactsHash[user.uid] = user
    }
  })
  return [users, contactsHash]
}

export const populateContacts = () => async dispatch => {
  try {
    const firebaseUsers = await getAllUsers()
    const contactsObj = await getAllContacts()
    const [contactsArr, contactsHash] = findOverlap(firebaseUsers, contactsObj)
    dispatch(getContacts(contactsArr))
    dispatch(getContactsHash(contactsHash))
  } catch (error) {
    console.log(error)
  }
}
