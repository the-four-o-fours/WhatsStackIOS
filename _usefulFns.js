// a method for getting someone else's public key from the DB
const ref = firebase
  .database()
  .ref('Users')
  .orderByChild('phoneNumber')
  .equalTo('+16462479835')
  .on('value', snapshot => {
    console.log(snapshot.val())
    console.log('>>>publicKey<<<', Object.values(snapshot.val())[0].publicKey)
    publicKey = Object.values(snapshot.val())[0].publicKey
  })

// a method for retrieving your private key
getPrivKey = async () => {
  try {
    let key = await AsyncStorage.getItem('privateKey')
  } catch (error) {
    alert(error)
  }
}
