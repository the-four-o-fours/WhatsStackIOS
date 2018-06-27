import React from 'react';
import {View, Text} from 'react-native';

import firebase from 'react-native-firebase';

const messages = [
  {
    text: "message 1",
    sender: true,
    group: false,
    time: "some bs",
  },
  {
    text: "message 2",
    sender: true,
    group: false,
    time: "some bs",
  },
  {
    text: "message 3",
    sender: true,
    group: false,
    time: "some bs",
  },
  {
    text: "message 4",
    sender: true,
    group: false,
    time: "some bs",
  },
]

const SingleMessage = () => {
  return (
    <View>
      {messages.map(message => <Text>{message.text}</Text>)}
    </View>
  );
};

export default SingleMessage;