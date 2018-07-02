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
import {ListItem} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'
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
    const url = this.props.user.img
    await this.downloadAvatar(url)
  }

  downloadAvatar = url => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
    })
      .fetch('GET', url)
      .then(res => {
        console.log('The file saved to ', res.path())
      })
  }

  uploadAvatar = () => {
    const ref = firebase
      .storage()
      .ref(`/Users/${this.props.user.uid}/avatar.jpg`)
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
    const user = this.props.user
    const url =
      '/Users/chloe/Library/Developer/CoreSimulator/Devices/68F66964-35B2-44FF-8089-F5E546765FE3/data/Containers/Data/Application/B44C55ED-73E6-4033-A9EA-8199A63E9675/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_mcxs890geboxbgbcmkt1y.jpg'
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
                  maxLength={20}
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
                <ListItem
                  roundAvatar
                  title={user.displayName}
                  avatar={{uri: url}}
                />
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
