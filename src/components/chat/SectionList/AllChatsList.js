import React, {Component} from 'react'
import {FlatList, Text, StyleSheet, Image, View} from 'react-native'
// import {Divider, Card, ListItem} from 'react-native-material-ui'
import {ListItem} from 'react-native-elements'

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
    // fontWeight: 'bold',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
})
const rows = [
  {
    id: '1',
    text: 'Tacos',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '2',
    text: 'Beer',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '3',
    text: 'Code',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '4',
    text: 'Team 404',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '5',
    text: 'Tacos',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '6',
    text: 'Beer',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '7',
    text: 'Code',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '8',
    text: 'Team 404',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '9',
    text: 'Tacos',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '10',
    text: 'Beer',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '11',
    text: 'Code',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
]

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
      <ListItem
          title={`${item.text} `}
          subtitle={item.dateLastMsg}
          // leftAvatar={{ source: { uri: item.img} }}
          // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
          // badge= '>'
          // containerStyle={{ 
          //  backgroundColor: '#56579B'
            
          
        /> 
        
        {/* <Divider /> */}
        {/* <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/47.jpg' }}
          style={styles.photo}
        /> */}

      
      </View>
    )
  }

  render() {
    return (
      <FlatList
        // style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    )
  }
}
