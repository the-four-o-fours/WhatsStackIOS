import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

const ChatBubble = props => {
  const {message} = props
  const isToday = () => {
    const now = new Date(Date.now()).toString()
    const messageDate = new Date(Number(message.timeStamp)).toString()
    if (now.slice(0, 15) === messageDate.slice(0, 15)) {
      return `Today ${messageDate.slice(16, 24)}`
    } else {
      return messageDate.slice(0, 24)
    }
  }

  if (message.sender) {
    return (
      <View style={[styles.container, styles.senderBubble]}>
        <View style={[styles.bubble, styles.senderInnerBubble]}>
          <Text style={styles.messageText}>{props.message.text}</Text>
          <Text style={styles.timeStampText}>{`\n${isToday()}`}</Text>
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
          <Text style={styles.timeStampText}>{`\n${isToday()}`}</Text>
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
    backgroundColor: '#006994',
    borderTopRightRadius: 0,
  },
  receiverInnerBubble: {
    backgroundColor: '#AEE8C3',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  timeStampText: {
    fontSize: 12,
    color: '#E8FDFF',
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
    borderTopColor: '#006994',
  },
  receiverTriangle: {
    borderTopColor: '#AEE8C3',
    alignSelf: 'flex-end',
    marginBottom: 5,
    transform: [{rotate: '180deg'}],
  },
})

export default ChatBubble
