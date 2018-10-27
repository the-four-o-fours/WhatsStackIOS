import firebase from 'react-native-firebase'

export const findAnonymous = async function(id) {
  try {
    const defaultImg = this.props.user.default
    const user = {
      uid: id,
      img: defaultImg,
    }
    const snapshot = await firebase
      .database()
      .ref(`/Users/${id}`)
      .once('value')
    user.displayName = snapshot.val().displayName
    return user
  } catch (err) {
    console.log(err)
  }
}
