import React from 'react';
import { StyleSheet, Text } from 'react-native';

import firebase from 'react-native-firebase';

import Login from './auth/Login';

const Main = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return <Text> someday, a real chat app will be here </Text>;
  } else {
    return <Login />;
  }
};

export default Main;
