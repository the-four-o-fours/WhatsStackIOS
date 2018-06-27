import React from 'react';
import {View, Button, Text, TextInput, Image} from 'react-native';
import Chat from './Chat'

import firebase from 'react-native-firebase';

const AllChats = () => {
  return (
    <View>
      <Chat/>
    </View>
  );
};

export default AllChats;
