import React from 'react';
import {View, Text} from 'react-native';

import firebase from 'react-native-firebase';

const messages = {
  msg1: {
    text: "message 1",
    sender: true,
    group: false,
  },
  msg2: {
    text: "message 2",
    sender: true,
    group: false,
  },
  msg3: {
    text: "message 3",
    sender: true,
    group: false,
  },
  msg4: {
    text: "message 4",
    sender: true,
    group: false,
  },
}

const SingleMessage = () => {
  return (
    <View>
      {messages.map(message => <Text>{message.text}</Text>)}
    </View>
  );
};

export default SingleMessage;