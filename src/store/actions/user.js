export const GOT_USER = 'GOT_USER'

export const getUser = userData => {
  const user = {
    displayName: userData.displayName,
    uid: userData.uid,
    phoneNumber: userData.phoneNumber,
    publicKey: userData.publicKey,
  }
  return {
    type: GOT_USER,
    user,
  }
}
