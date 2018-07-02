import React, {Component} from 'react'
import {FlatList, StyleSheet, Image} from 'react-native'
import {ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AllChats extends Component {
  goToConvo = item => {
    this
      .props
      .navigation
      .navigate('Chat', {
        uid: item.uid,
        title: item.title,
        publicKey: item.publicKey
      })
  }

  truncate = (string) => {
    let trimmed = ''
    if (string.length > 20) {
      trimmed += string.slice(0, 21) + '... '
    } else {
      trimmed = string
    }

    return trimmed
  }

  extractKey = ({uid}) => uid
  // renderItem = ({item}) => {   const lastSeen = item.seen     ?
  // this.truncate(item.lastMessage.text)     :
  // this.truncate(item.lastMessage.text) + <Icon name='user' size={24}
  // color='black'/>   return (<ListItem     roundAvatar
  // title={`${item.displayName}`}     subtitle={lastSeen}     style={{
  // backgroundColor: 'red'   }}     avatar={{     uri: item.img   }} onPress={()
  // => this.goToConvo(item)}     onLongPress={() => { console.log('Long press
  // show drawer')   }}/>) }

  render() {

    return (
      <FlatList
        data={this.props.chats}
        renderItem={({item}) => {
        const lastSeen = item.seen
          ? this.truncate(item.lastMessage.text)
          : this.truncate(item.lastMessage.text) + ' \uD83D\uDE00';
        return (<ListItem
          roundAvatar
          title={`${item.displayName}`}
          subtitle={lastSeen}
          style={{
          backgroundColor: 'red'
        }}
          avatar={{
          uri: item.img
        }}
          onPress={() => this.goToConvo(item)}
          onLongPress={() => {
          console.log('Long press show drawer')
        }}/>)
      }}
        keyExtractor={this.extractKey}/>
    )
  }
}

const styles = StyleSheet.create({
  chats: {
    borderColor: '#fff'
  }
})