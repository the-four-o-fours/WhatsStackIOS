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

import firebase from 'react-native-firebase'

class AccountInfo extends React.Component {
  state = {
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
    this.setState({displayName: ''})
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <Text>AccountInfo Dummy Component</Text>
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
            <Button title="Sign Out" color="red" onPress={this.signOut} />
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
