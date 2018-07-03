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
        url: childData.img || 'default',
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

const findOverlap = async (
  firebaseUsers,
  contactsObj,
  prevContacts,
  defaultImg,
) => {
  const users = []
  const contactsHash = {}
  firebaseUsers.forEach(user => {
    if (contactsObj[user.phoneNumber]) {
      user.phoneName = contactsObj[user.phoneNumber]
      users.push(user)
      contactsHash[user.uid] = user
    }
  })
  await Promise.all(
    users.map(async user => {
      try {
        const id = user.uid
        if (!prevContacts[id] || prevContacts[id].url === 'default') {
          user.img = defaultImg
        } else if (prevContacts[id].url !== user.url) {
          const localUrl = await downloadedImgUrl(id)
          user.img = localUrl
        } else {
          user.img = prevContacts[id].img
        }
        contactsHash[id].img = user.img
      } catch (err) {
        console.log(err)
      }
    }),
  )
  return [users, contactsHash]
}

export const populateContacts = () => async (dispatch, getState) => {
  try {
    const firebaseUsers = await getAllUsers()
    const contactsObj = await getAllContacts()
    const {user, contactsHash} = getState()
    const [contactsArr, newContactsHash] = await findOverlap(
      firebaseUsers,
      contactsObj,
      contactsHash,
      user.default,
    )
    dispatch(getContacts(contactsArr))
    dispatch(getContactsHash(newContactsHash))
  } catch (error) {
    console.log(error)
  }
}
