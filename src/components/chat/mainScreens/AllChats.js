import React, {Component} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class AllChats extends Component {
  goToConvo = item => {
    this.props.navigation.navigate('Chat', {
      uid: item.uid,
      title: item.title,
      publicKey: item.publicKey,
    })
  }

  truncate = string => {
    let trimmed = ''
    if (string.length > 30) {
      trimmed += string.slice(0, 30) + '...'
    } else {
      trimmed = string
    }

    return trimmed
  }

  extractKey = ({uid}) => uid
  renderItem = ({item}) => {
    const lastSeen = item.seen
      ? this.truncate(item.lastMessage.text)
      : this.truncate(item.lastMessage.text) + ' \uD83D\uDE00'
    return (
      <ListItem
        roundAvatar
        title={`${item.displayName}`}
        subtitle={lastSeen}
        avatar={{
          uri: item.img,
        }}
        onPress={() => this.goToConvo(item)}
        onLongPress={() => {
          console.log('Long press show drawer')
        }}
      />
    )
  }

  render() {
    return (
      <FlatList
        style={{
          borderColor: 'white',
        }}
        data={this.props.chats}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
      />
    )
  }
}

const styles = StyleSheet.create({
  chats: {
    borderColor: '#fff',
  },
})
