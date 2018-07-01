import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'

import firebase from 'react-native-firebase'

import BottomNavBar from '../mainScreens/BottomNavBar'

class Contacts extends React.Component {
  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>AccountInfo Dummy Component</Text>
          <Button title="Sign Out" color="red" onPress={this.signOut} />
        </View>
        <BottomNavBar navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

export default Contacts
