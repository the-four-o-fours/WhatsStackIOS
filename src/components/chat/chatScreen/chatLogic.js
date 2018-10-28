import {Keyboard} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import firebase from 'react-native-firebase'

import {rsa} from '../../../logic'

// this whole mess is because RSA can only encrypt strings less than 117 characters long
const splitterForRSA = message => {
  const messageChunks = []
  let tracker = 0
  while (tracker < message.length) {
    messageChunks.push(message.slice(tracker, tracker + 117))
    tracker += 117
  }
  return messageChunks
}

export const sendMessage = function() {
  Keyboard.dismiss()
  const text = splitterForRSA(this.state.newMessage)
  const timeStamp = Date.now()
  this.state.members.forEach(member => {
    //create message obj
    rsa.setPublicString(member.publicKey)
    const encrypted = text.map(chunk => rsa.encrypt(chunk))
    const message = {}
    message[timeStamp] = {
      text: encrypted,
      sender: this.props.user.uid,
      img: this.state.isSendingImg,
    }
    //send message
    firebase
      .database()
      .ref(
        `Users/${member.uid}/${
          //write to your id field in their db entry or their id field in your db entry in 1-1, or the groupconvo id in gchat
          this.state.uid === member.uid ? this.props.user.uid : this.state.uid
        }/conversation`,
      )
      .update(message)
  })
  if (this.state.startsConvo) {
    this.updateMembers()
    this.setState({startsConvo: false})
  }
  this.setState({
    isSendingImg: false,
    newMessage: '',
    height: 29.5,
  })
}

export const updateMembers = function() {
  this.state.members.forEach(member => {
    firebase
      .database()
      .ref(
        `Users/${member.uid}/${
          //write to your id field in their db entry or their id field in your db entry in 1-1, or the groupconvo id in gchat
          this.state.uid === member.uid ? this.props.user.uid : this.state.uid
        }/members`,
      )
      .set(this.state.members)
  })
}

const uploadImage = (image, path, i, that) => {
  const metadata = {contentType: image.mime}
  return firebase
    .storage()
    .ref(`/Users/${that.props.user.uid}/${that.state.uid}/${path}imgNo${i}.jpg`)
    .putFile(image.sourceURL, metadata)
}

const getDownloadUrl = uploadResult =>
  firebase
    .storage()
    .ref(`${uploadResult.ref}`)
    .getDownloadURL()

const prepAndSend = (downloadUrl, that) => {
  that.setState(
    {
      newMessage: downloadUrl,
      isSendingImg: true,
    },
    () => that.sendMessage(),
  )
}

export const sendImage = async function(type) {
  try {
    //select images
    let images
    let optionsObj = {
      mediaType: 'photo',
      compressImageQuality: 0.1,
    }
    if (type === 'gallery') {
      optionsObj.multiple = true
      images = await ImagePicker.openPicker(optionsObj)
    } else if (type === 'camera') {
      console.log('camera upload')
      images = await ImagePicker.openCamera(optionsObj)
    }
    //upload images to firebase
    const path = Date.now()
    const uploadResults = await Promise.all(
      images.map((image, i) => uploadImage(image, path, i, this)),
    )
    //get download urls for the uploaded images
    const downloadUrls = await Promise.all(
      uploadResults.map(uploadResult => getDownloadUrl(uploadResult)),
    )
    //send the download urls out as image messages
    downloadUrls.forEach(downloadUrl => prepAndSend(downloadUrl, this))
  } catch (err) {
    console.log(err)
  }
}
