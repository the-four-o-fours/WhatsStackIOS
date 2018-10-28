import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class AllChats extends Component {
  goToChat = item => {
    this.props.navigation.navigate('Chat', {
      uid: item.uid,
      members: item.members,
      startsConvo: false,
      title: item.displayName,
    })
  }

  renderItem = ({item}) => {
    const lastMessage = item.lastMessage.img ? 'Image' : item.lastMessage.text
    return (
      <ListItem
        roundAvatar
        title={`${item.seen ? '' : '\uD83D\uDE00 '}${item.displayName}`}
        subtitle={`${item.time}: ${lastMessage}`}
        avatar={{
          uri: item.img,
        }}
        onPress={() => this.goToChat(item)}
      />
    )
  }

  render() {
    return this.props.chats.length > 0 ? (
      <FlatList
        data={this.props.chats}
        renderItem={this.renderItem}
        keyExtractor={({lastMessage}) => lastMessage.timeStamp}
      />
    ) : (
      <View>
        <Text style={styles.noMessages}>No Messages ◉︵◉</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noMessages: {
    fontSize: 32,
    color: '#006994',
    alignSelf: 'center',
    paddingTop: 250,
  },
})
