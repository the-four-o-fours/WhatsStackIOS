import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

const BottomNavBar = () => (
  <View style={styles.navBar}>
    <TouchableOpacity style={styles.leftButton}>
      <Icon name="contacts" color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.centerButton}>
      <Icon name="account-circle" color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.rightButton}>
      <Icon name="message" color="white" />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 50,
  },
  leftButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRightWidth: 1,
    borderColor: 'white',
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderLeftWidth: 1,
    borderColor: 'white',
  },
  centerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
  },
})

export default BottomNavBar
