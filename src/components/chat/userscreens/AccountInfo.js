import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'

import firebase from 'react-native-firebase'

class Contacts extends React.Component {
  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>AccountInfo Dummy Component</Text>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Contacts
