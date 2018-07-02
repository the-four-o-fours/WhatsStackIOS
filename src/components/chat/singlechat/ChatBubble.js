import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'

const ChatBubble = props => {
  const message = props.message
  return (
    <View style={message.sender ? styles.senderBubble : styles.receiverBubble}>
      <Text style={message.sender ? styles.senderText : styles.receiverText}>
        {message.text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    maxWidth: 300,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 15,
    borderBottomRightRadius: 0,
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    maxWidth: 300,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
  },
  senderText: {
    color: 'white',
  },
  receiverText: {
    backgroundColor: 'white',
  },
})

export default ChatBubble
