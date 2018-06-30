import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import TopNavigation, {
  IconTab,
  Badge,
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Contacts from './Contacts'

const BottomNavigator = createMaterialBottomTabNavigator({
  Chats: { screen: Contacts },
},{
  initialRouteName: 'Chats',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});


export default BottomNavigator





