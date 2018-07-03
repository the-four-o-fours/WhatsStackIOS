import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ChatBubble = props => {
  const {message} = props
  const timeStamp = new Date(Number(message.timeStamp)).toString().slice(0, 24)
  if (message.sender) {
    return (
      <View style={[styles.container, styles.senderBubble]}>
        <View style={[styles.bubble, styles.senderInnerBubble]}>
          <Text style={styles.text}>{props.message.text}</Text>
          <Text>{`\n${timeStamp}`}</Text>
        </View>
        <View style={[styles.triangle, styles.senderTriangle]} />
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.receiverBubble]}>
        <View style={[styles.triangle, styles.receiverTriangle]} />
        <View style={[styles.bubble, styles.receiverInnerBubble]}>
          <Text style={styles.text}>{props.message.text}</Text>
          <Text>{timeStamp}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  bubble: {
    maxWidth: 335,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  senderBubble: {
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    alignSelf: 'flex-start',
  },
  senderInnerBubble: {
    backgroundColor: '#DCF1DC',
    borderTopRightRadius: 0,
  },
  receiverInnerBubble: {
    backgroundColor: '#8BD08B',
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 16,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderRightColor: 'transparent',
    marginTop: 5,
  },
  senderTriangle: {
    borderTopColor: '#DCF1DC',
  },
  receiverTriangle: {
    borderTopColor: '#8BD08B',
    alignSelf: 'flex-end',
    marginBottom: 5,
    transform: [{rotate: '180deg'}],
  },
})

export default ChatBubble
