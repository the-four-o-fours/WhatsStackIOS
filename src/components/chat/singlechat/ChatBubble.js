import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native'

const ChatBubble = props => {
  const {message, user} = props

  const isToday = () => {
    const now = new Date(Date.now()).toString()
    const messageDate = new Date(Number(message.timeStamp)).toString()
    if (now.slice(0, 15) === messageDate.slice(0, 15)) {
      return `Today ${messageDate.slice(16, 24)}`
    } else {
      return messageDate.slice(0, 24)
    }
  }

  if (message.sender === user.uid) {
    return (
      <View style={[styles.container, styles.senderBubble]}>
        <View style={[styles.bubble, styles.senderInnerBubble]}>
          {message.img ? (
            <Image
              resizeMode="contain"
              loadingIndicatorSource={<ActivityIndicator />}
              style={{width: 300, height: 220}}
              source={{uri: message.text}}
            />
          ) : (
            <Text style={styles.senderMessageText}>
              {message.text.slice(7)}
            </Text>
          )}
          <Text style={styles.senderTimeStampText}>{`\n${isToday()}`}</Text>
        </View>
        <View style={[styles.triangle, styles.senderTriangle]} />
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.receiverBubble]}>
        <View style={[styles.triangle, styles.receiverTriangle]} />
        <View style={[styles.bubble, styles.receiverInnerBubble]}>
          {message.img ? (
            <Image
              resizeMode="contain"
              loadingIndicatorSource={<ActivityIndicator />}
              style={{width: 300, height: 220}}
              source={{uri: message.text}}
            />
          ) : (
            <Text style={styles.receiverMessageText}>{message.text}</Text>
          )}
          <Text style={styles.receiverTimeStampText}>{`\n${isToday()}`}</Text>
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
  senderMessageText: {
    fontSize: 16,
    color: 'white',
  },
  senderTimeStampText: {
    fontSize: 12,
    color: 'white',
  },
  receiverMessageText: {
    fontSize: 16,
    color: '#4a4c4f',
  },
  receiverTimeStampText: {
    fontSize: 12,
    color: '#4a4c4f',
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
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
})

export default ChatBubble
