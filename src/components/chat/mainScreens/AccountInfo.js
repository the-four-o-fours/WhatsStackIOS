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
    ref: null,
  }

  componentDidMount() {
    const ref = firebase.storage().ref(`/Users/${this.props.user.uid}/avatar`)
    this.setState({ref})
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

  uploadAvatar = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(images => {
      console.log(images)
      this.state.ref
        .putFile(images.sourceURL)
        .then(_ => console.log('uploaded?'))
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
              onPress={this.uploadAvatar}
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
