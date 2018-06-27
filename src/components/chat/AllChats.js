import React from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'react-native-firebase';


import AllChatsList from './SectionList/AllChatsList'
import Header from './AllChats/Header';

const AllChats = () => {
  return (
    <View>
      <Header />
        <AllChatsList />
    </View>
  );
};

export default AllChats;
