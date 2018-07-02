import React, {Component} from 'react'
import {FlatList, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import NewChatIcon from '../../../components/ui/NewChatIcon'

export default class AllChats extends Component {
  goToConvo = (uid, title, publicKey) => {
    this
      .props
      .navigation
      .navigate('Chat', {uid, title, publicKey})
  }

  truncate = (string) => {
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
      : this.truncate(item.lastMessage.text) + ' Hello'
    return (
      <View >
        <ListItem
          roundAvatar
          title={`${item.displayName}`}
          subtitle={lastSeen}
          avatar={{
          uri: item.img
        }}
          onPress={() => this.goToConvo(item.uid, item.displayName, item.publicKey)}
          onLongPress={() => {
          console.log('Long press show drawer')
        }}/>
      </View>
    )
  }

  render() {
    return (<FlatList
      data={this.props.chats}
      renderItem={this.renderItem}
      keyExtractor={this.extractKey}/>)
  }
}