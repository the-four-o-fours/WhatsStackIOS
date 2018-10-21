import Contacts from 'react-native-unified-contacts'
import firebase from 'react-native-firebase'
import download from '../../components/download'

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
  try {
    const firebaseUsers = []
    const snapshot = await firebase
      .database()
      .ref(`/Users/`)
      .once('value')
    snapshot.forEach(childSnap => {
      const firebaseUser = childSnap.val()
      firebaseUsers.push({
        displayName: firebaseUser.displayName,
        phoneNumber: firebaseUser.phoneNumber,
        uid: firebaseUser.uid,
        publicKey: firebaseUser.publicKey,
        url: firebaseUser.img,
      })
    })
    return firebaseUsers
  } catch (err) {
    console.log(err)
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
  const contacts = {}
  firebaseUsers.forEach(user => {
    if (contactsObj[user.phoneNumber]) {
      user.phoneName = contactsObj[user.phoneNumber]
      contacts[user.uid] = user
    }
  })
  await Promise.all(
    Object.keys(contacts).map(async key => {
      const user = contacts[key]
      try {
        const id = user.uid
        if (prevContacts[id] && prevContacts[id].url === user.url) {
          // We have seen this user before and we do not need to download a new avatar
          user.img = prevContacts[id].img
        } else if (prevContacts[id]) {
          // We have seen this user before but we need to download a new avatar
          const localUrl = await downloadedImgUrl(id)
          user.img = localUrl
        } else if (user.url === 'default') {
          // This is a new person added to our contacts with no specified image, so set to device's default
          user.img = defaultImg
        } else {
          // This is a new person added to our contacts with a specified image, so download it and set it
          const localUrl = await downloadedImgUrl(id)
          user.img = localUrl
        }
      } catch (err) {
        console.log(err)
      }
    }),
  )
  return contacts
}

export const populateContacts = () => async (dispatch, getState) => {
  try {
    const [firebaseUsers, contactsObj] = await Promise.all([
      getAllUsers(),
      getAllContacts(),
    ])
    const {user, contacts} = getState()
    const newContacts = await findOverlap(
      firebaseUsers,
      contactsObj,
      contacts,
      user.default,
    )
    dispatch(getContacts(newContacts))
  } catch (err) {
    console.log(err)
  }
}
