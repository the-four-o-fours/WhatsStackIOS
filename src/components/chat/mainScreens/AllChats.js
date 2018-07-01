import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ListItem} from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default class AllChats extends Component {
  goToConvo = (uid, title) => {
    this.props.navigation.navigate('Chat', {
      uid,
      title,
    })
  }

  extractKey = ({uid}) => uid
  renderItem = ({item}) => {
    const lastSeen = item.seen
      ? item.lastMessage.text
      : item.lastMessage.text + ' Not seen'
    return (
      <View>
        <ListItem
          roundAvatar
          title={`${item.displayName}`}
          subtitle={lastSeen}
          avatar={{uri: item.img}}
          onPress={() => this.goToConvo(item.uid, item.displayName)}
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
        <FlatList
          data={this.props.chats}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
        />
      </View>
    )
  }
}
