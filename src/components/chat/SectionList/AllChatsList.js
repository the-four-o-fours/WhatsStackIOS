import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, Image, View } from 'react-native'

import Header from '../AllChats/Header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
const rows = [
  {
    id: 1,
    text: 'Tacos',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22'
  },
  {
    id: 2,
    text: 'Beer',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22'
  },
  {
    id: 3,
    text: 'Code',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22'
  },
  {
    id: 4,
    text: 'Team 404',
    img: 'https://randomuser.me/api/portraits/men/47.jpg' ,
    dateLastMsg: '1/22/22'
  }
];





// const rows = [
//   {id: 0, text: 'View'},
//   {id: 1, text: 'Text'},
//   {id: 2, text: 'Image'},
//   {id: 3, text: 'ScrollView'},
//   {id: 4, text: 'ListView'},
// ]

const extractKey = ({id}) => id

export default class AllChatView extends Component {
  
  renderItem = ({item}) => {
    return (
      <View>

      <Image source={{ uri: 'https://randomuser.me/api/portraits/men/47.jpg'}} style={styles.photo} />
      <Text style={styles.text}>
        {item.text}
      </Text>
      </View>
    )
  }
  
  render() {
    return (
      <FlatList
        style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }
}

