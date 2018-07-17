import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'
import download from '../../components/download'

export const GOT_CONTACTS_HASH = 'GOT_CONTACTS_HASH'

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
    .catch(err => {
      console.log(err)
      return 'exceeded'
    })
  let localUrl
  if (cloudUrl === 'exceeded') {
    localUrl =
      'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'
  } else {
    localUrl = await download(cloudUrl)
  }
  return localUrl
}

const findOverlap = async (
  firebaseUsers,
  contactsObj,
  prevContacts,
  defaultImg,
) => {
  const contactsHash = {}
  firebaseUsers.forEach(user => {
    if (contactsObj[user.phoneNumber]) {
      user.phoneName = contactsObj[user.phoneNumber]
      contactsHash[user.uid] = user
    }
  })
  await Promise.all(
    Object.keys(contactsHash).map(async key => {
      const user = contactsHash[key]
      try {
        const id = user.uid
        if (prevContacts[id]) {
          // We have seen this user before
          if (prevContacts[id].url === user.url) {
            user.img = prevContacts[id].img // Do not need to download new avatar
          } else {
            const localUrl = await downloadedImgUrl(id) // Download new image
            user.img = localUrl
          }
        } else {
          // This is a new person added to our contacts
          if (user.url === 'default') {
            user.img = defaultImg // Set default image on our device
          } else {
            const localUrl = await downloadedImgUrl(id) // Download new image
            user.img = localUrl
          }
        }
      } catch (err) {
        console.log(err)
      }
    }),
  )
  return contactsHash
}

export const populateContacts = () => async (dispatch, getState) => {
  try {
    const firebaseUsers = await getAllUsers()
    const contactsObj = await getAllContacts()
    const {user, contactsHash} = getState()
    const newContactsHash = await findOverlap(
      firebaseUsers,
      contactsObj,
      contactsHash,
      user.default,
    )
    dispatch(getContactsHash(newContactsHash))
  } catch (error) {
    console.log(error)
  }
}
