import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'

import {formatDate} from '../../../logic'

const ChatBubble = props => {
  const {message, title, displayName, isGChat, user} = props

  const formattedDate = formatDate(message.timeStamp)

  const goToImage = () => {
    const img = message.text
    props.navigation.navigate('ImageView', {
      title,
      img,
    })
  }

  if (message.sender === user.uid) {
    return (
      <View style={[styles.container, styles.senderBubble]}>
        <View style={[styles.bubble, styles.senderInnerBubble]}>
          {message.img ? (
            <TouchableOpacity onPress={goToImage}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: message.text}}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.senderMessageText}>{message.text}</Text>
          )}
          <Text style={styles.senderTimeStampText}>{`\n${formattedDate}`}</Text>
        </View>
        <View style={[styles.triangle, styles.senderTriangle]} />
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.receiverBubble]}>
        <View style={[styles.triangle, styles.receiverTriangle]} />
        <View style={[styles.bubble, styles.receiverInnerBubble]}>
          {isGChat && (
            <Text style={styles.receiverTimeStampText}>
              {`${displayName}\n`}
            </Text>
          )}
          {message.img ? (
            <TouchableOpacity onPress={goToImage}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: message.text}}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.receiverMessageText}>{message.text}</Text>
          )}
          <Text
            style={styles.receiverTimeStampText}
          >{`\n${formattedDate}`}</Text>
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
  image: {
    width: 300,
    height: 220,
  },
})

export default ChatBubble
