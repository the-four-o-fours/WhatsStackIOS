import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ListItem} from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default class AllChatsList extends Component {
  extractKey = ({uid}) => uid
  renderItem = ({item}) => {
    const goToConvo = this.props.goToConvo
    return (
      <View>
        <ListItem
          roundAvatar
          title={`${item.displayName}`}
          subtitle={item.displayName}
          avatar={{uri: item.img}}
          onPress={() => goToConvo(item.uid, item.displayName)}
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
