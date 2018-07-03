import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'
import download from '../../components/download'

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
        url: childData.img,
      })
    })
    return firebaseUsers
  } catch (error) {
    console.log(error)
  }
}

const downloadedImgUrl = async id => {
  const cloudUrl = await firebase
    .storage()
    .ref(`/Users/${id}/avatar.jpg`)
    .getDownloadURL()
  const localUrl = await download(cloudUrl)
  return localUrl
}

const findOverlap = (firebaseUsers, contactsObj, prevContacts) => {
  return new Promise((resolve, reject) => {
    const users = []
    const contactsHash = {}
    firebaseUsers.forEach(async user => {
      if (
        contactsObj[user.phoneNumber] &&
        user.phoneNumber !== '+17033094584' //hardcoded to prevent Ian's lack of avatar from breaking the app
      ) {
        user.phoneName = contactsObj[user.phoneNumber]
        if (
          (prevContacts[user.uid] && prevContacts[user.uid].url !== user.url) ||
          !prevContacts[user.uid]
        ) {
          const localUrl = await downloadedImgUrl(user.uid)
          user.img = localUrl
        } else {
          user.img = prevContacts[user.uid].img
        }
        users.push(user)
        contactsHash[user.uid] = user
      }
    })
    resolve([users, contactsHash])
  })
}

export const populateContacts = () => async (dispatch, getState) => {
  try {
    const firebaseUsers = await getAllUsers()
    const contactsObj = await getAllContacts()
    const prevContactsHash = getState().contactsHash
    const [contactsArr, contactsHash] = await findOverlap(
      firebaseUsers,
      contactsObj,
      prevContactsHash,
    )
    dispatch(getContacts(contactsArr))
    dispatch(getContactsHash(contactsHash))
  } catch (error) {
    console.log(error)
  }
}
