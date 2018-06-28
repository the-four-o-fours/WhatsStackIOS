import React, {Component} from 'react'
import {FlatList, Text, StyleSheet, Image, View} from 'react-native'
// import {Divider, Card, ListItem} from 'react-native-material-ui'
import {ListItem, Avatar} from 'react-native-elements'

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
    img: 'https://www.mystellar.org/uploads/avatars/avatar_1424.jpg?dateline=1494984512',
    dateLastMsg: '1/22/22',
  },
  {
    id: '3',
    text: 'Code',
    img: 'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/blogs/34554/2011/01/52987-43921.jpg?itok=1-Cfw5CD',
    dateLastMsg: '1/22/22',
  },
  {
    id: '4',
    text: 'Team 404',
    img: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png',
    dateLastMsg: '1/22/22',
  },
  {
    id: '5',
    text: 'Python',
    img: 'https://wallpaper.hinaji.com/wp-content/uploads/2017/06/Black-Funny-Avatars-Free-Download.png',
    dateLastMsg: '1/22/22',
  },
  {
    id: '6',
    text: 'Paper',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '7',
    text: 'Convex Mirrors',
    img: 'https://aveplay.com/missing/avatar/avatar/missing.png',
    dateLastMsg: '1/22/22',
  },
  {
    id: '8',
    text: 'Squid Helmets',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    dateLastMsg: '1/22/22',
  },
  {
    id: '9',
    text: 'Hand Pressed Waffles',
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
  // conversations actually look like this
  {
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    // timestamp : message object with text of message, boolean for sender, boolean for groupchat
    //I think the most recent message is at the bottom
  }
]


const extractKey = ({id}) => id

export default class AllChatView extends Component {
  renderItem = ({item}) => {
    return (
      <View>
      <ListItem
          roundAvatar
          title={`${item.text}`}
          subtitle={item.dateLastMsg}
          avatar={{ uri: item.img} }
          // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
          // badge= '>'
          // containerStyle={{ 
          //  backgroundColor: '#56579B'
            
          onPress={() => {
            console.log('You tapped a room!');
          }}
          onLongPress={() => {
            console.log('Long press show drawer');
          }}
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
