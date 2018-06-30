import React, {Component} from 'react'
import {FlatList, Text, StyleSheet, Image, View, Button} from 'react-native'
// import {Divider, Card, ListItem} from 'react-native-material-ui'
import {ListItem, Avatar} from 'react-native-elements'
import firebase from 'react-native-firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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
    img:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png',
    dateLastMsg: '1/22/22',
  },
  {
    id: '3',
    text: 'Code',
    img:
      'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/blogs/34554/2011/01/52987-43921.jpg?itok=1-Cfw5CD',
    dateLastMsg: '1/22/22',
  },
  {
    id: '4',
    text: 'Team 404',
    img:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png',
    dateLastMsg: '1/22/22',
  },
  {
    id: '5',
    text: 'Python',
    img:
      'https://wallpaper.hinaji.com/wp-content/uploads/2017/06/Black-Funny-Avatars-Free-Download.png',
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
    img:
      'https://wallpaper.hinaji.com/wp-content/uploads/2017/06/Black-Funny-Avatars-Free-Download.png',
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
]

const signOut = () => {
  firebase.auth().signOut()
}

const extractKey = ({id}) => id

export default class AllChatView extends Component {
  renderItem = ({item}) => {
    return (
      <View>
        <ListItem
          roundAvatar
          title={`${item.text}`}
          subtitle={item.dateLastMsg}
          avatar={{uri: item.img}}
          onPress={() => {
            console.log('You tapped a room!')
          }}
          onLongPress={() => {
            console.log('Long press show drawer')
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" color="red" onPress={signOut} />

        <FlatList
          data={rows}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
        />

        <BottomNavigator />
      </View>
    )
  }
}
