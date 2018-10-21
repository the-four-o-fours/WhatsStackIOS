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
    const text = item.lastMessage.img ? 'Image' : item.lastMessage.text
    let lastMessage = text.slice(0, 27)
    lastMessage += lastMessage.length === 27 ? '...' : ''
    lastMessage += item.seen ? '' : ' \uD83D\uDE00'
    return (
      <ListItem
        roundAvatar
        title={`${item.displayName}`}
        subtitle={lastMessage}
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
