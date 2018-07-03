import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const BottomNavBar = props => (
  <View style={styles.navBar}>
    <TouchableOpacity
      style={
        props.screen === 'AccountInfo' ? styles.btnSelected : styles.notSelected
      }
      onPress={() => {
        props.displayAccountInfo()
      }}
    >
      <Icon name="user-circle" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity
      style={
        props.screen === 'Contacts' ? styles.btnSelected : styles.notSelected
      }
      onPress={() => {
        props.displayContacts()
      }}
    >
      <Icon name="address-book" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity
      style={
        props.screen === 'AllChats' ? styles.btnSelected : styles.notSelected
      }
      onPress={() => {
        props.displayChats()
      }}
    >
      <Icon name="comments" size={24} color="white" />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#20AAB2',
    height: 50,
  },
  btnSelected: {
    backgroundColor: '#AEE8C3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  notSelected: {
    borderColor: '#20AAB2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
})

export default BottomNavBar
