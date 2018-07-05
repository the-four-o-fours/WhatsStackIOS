import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class AllChats extends Component {
  goToChat = item => {
    this
      .props
      .navigation
      .navigate('Chat', {
        uid: item.uid,
        title: item.displayName,
        publicKey: item.publicKey
      })
  }

  goToGChat = item => {
    this
      .props
      .navigation
      .navigate('GChat', {
        gUid: item.gUid,
        startsConvo: false,
        members: item.members,
        title: 'Group Chat'
      })
  }

  truncate = string => {
    if (string.length > 30) {
      return string.slice(0, 30) + '...'
    } else {
      return string
    }
  }

  renderItem = ({item}) => {
    const lastSeen = item.seen
      ? this.truncate(item.lastMessage.text)
      : this.truncate(item.lastMessage.text) + ' \uD83D\uDE00'
    if (item.gUid) {
      return (<ListItem
        roundAvatar
        title="Group Chat"
        subtitle={lastSeen}
        onPress={() => this.goToGChat(item)}
        onLongPress={() => {
        console.log('Long press show drawer')
      }}/>)
    } else {
      return (<ListItem
        roundAvatar
        title={`${item.displayName}`}
        subtitle={lastSeen}
        avatar={{
        uri: item.img
      }}
        onPress={() => this.goToChat(item)}
        onLongPress={() => {
        console.log('Long press show drawer')
      }}/>)
    }
  }

  render() {
    if (this.props.chats.length) {
      return (<FlatList
        style={{
        borderColor: 'white'
      }}
        data={this.props.chats}
        renderItem={this.renderItem}
        keyExtractor={({uid}) => uid}/>)
    } else {
      return (
        <View>
          <Text style={styles.noMessages}>No Messages ◉︵◉</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  chats: {
    borderColor: '#fff'
  },
  noMessages: {
    fontSize: 32,
    color: '#006994',
    alignSelf: 'center',
    paddingTop: 250
  }
})
