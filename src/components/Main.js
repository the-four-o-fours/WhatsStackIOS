import React from 'react';
import { StyleSheet, Text } from 'react-native';

import firebase from 'react-native-firebase';

import Login from './auth/Login';

const Main = props => {
  const user = firebase.auth().currentUser;
  if (user) {
    return (
      <Text navigation={props.navigation}>
        someday, a real chat app will be here
      </Text>
    );
  } else {
    return <Login navigation={props.navigation} />;
  }
};

export default Main;
