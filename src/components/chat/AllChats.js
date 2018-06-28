import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Chat from './Chat'

import firebase from 'react-native-firebase';

const AllChats = () => {
  return (
    <View style={styles.container}>
      <Chat/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  }
});

export default AllChats;
