import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'react-native-firebase'

class AccountInfo extends React.Component {
  state = {
    change: false,
    displayName: '',
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  changeDisplayName = () => {
    const userRef = firebase
      .database()
      .ref(`/Users/${this.props.user.uid}/displayName`)
    userRef.set(this.state.displayName)
    this.setState({displayName: '', change: false})
  }

  changeView = () => {
    this.setState({change: true})
  }

  setAvatar = async () => {
    const url = await this.uploadAvatar()
    // const avatarRef = firebase
    //   .database()
    //   .ref(`/Users/${this.props.user.uid}/img`)
    // avatarRef.set(url)
    // await this.downloadAvatar(url)
    console.log('downloaded?', url)
  }

  downloadAvatar = url => {
    const avatar = URL(url)
    const ref = firebase.storage().ref(`/Users/${this.props.user.uid}/avatar`)
    ref
      .downloadFile(avatar)
      .then(res => console.log('res', res))
      .catch(err => console.log(err))
  }

  uploadAvatar = () => {
    const ref = firebase.storage().ref(`/Users/${this.props.user.uid}/avatar`)
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
      }).then(images => {
        const metadata = {
          contentType: images.mime,
        }
        ref
          .putFile(images.sourceURL, metadata)
          .then(res => {
            if (res.state === 'success') resolve(res.downloadURL)
          })
          .catch(err => reject(err))
      })
    })
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <Text>AccountInfo Dummy Component</Text>
            {this.state.change ? (
              <View>
                <Text>Change your displayname:</Text>
                <TextInput
                  value={this.state.displayName}
                  onChangeText={displayName => this.setState({displayName})}
                  onSubmitEditing={this.changeDisplayName}
                />
                <TouchableOpacity
                  onPress={this.changeDisplayName}
                  disabled={!this.state.displayName.length}
                >
                  <Text>Enter</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text>{this.props.user.displayName}</Text>
                <Button title="Change" color="red" onPress={this.changeView} />
              </View>
            )}
            <Button title="Sign Out" color="red" onPress={this.signOut} />
            <Button
              title="Upload avatar"
              color="green"
              onPress={this.setAvatar}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
  },
})

export default AccountInfo
