import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

const BottomNavBar = props => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.displayAccountInfo()}
      >
        <Icon name="account-circle" color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.edges]}
        onPress={() => props.displayContacts()}
      >
        <Icon name="contact-mail" color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.displayChats()}
      >
        <Icon name="view-list" color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: 'white',
  },
  edges: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
})

export default BottomNavBar
