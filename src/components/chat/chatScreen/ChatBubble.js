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

  const bubbleCore = (specStyles, showName) => (
    <View style={[genStyles.bubble, specStyles.innerBubble]}>
      {showName && (
        <Text style={specStyles.timeStampText}>{`${displayName}\n`}</Text>
      )}
      {message.img ? (
        <TouchableOpacity onPress={goToImage}>
          <Image
            resizeMode="contain"
            style={genStyles.image}
            source={{uri: message.text}}
          />
        </TouchableOpacity>
      ) : (
        <Text style={specStyles.messageText}>{message.text}</Text>
      )}
      <Text style={specStyles.timeStampText}>{`\n${formattedDate}`}</Text>
    </View>
  )

  const sentByYou = message.sender === user.uid
  let specStyles = senStyles
  let showName = false
  if (!sentByYou) {
    specStyles = recStyles
    showName = isGChat
    return (
      <View style={[genStyles.container, specStyles.bubble]}>
        <View style={[genStyles.triangle, specStyles.triangle]} />
        {bubbleCore(specStyles, showName)}
      </View>
    )
  }
  return (
    <View style={[genStyles.container, specStyles.bubble]}>
      {bubbleCore(specStyles, showName)}
      <View style={[genStyles.triangle, specStyles.triangle]} />
    </View>
  )
}

const genStyles = StyleSheet.create({
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
  image: {
    width: 300,
    height: 220,
  },
})

const senStyles = StyleSheet.create({
  bubble: {
    alignSelf: 'flex-end',
  },
  innerBubble: {
    backgroundColor: '#006994',
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  timeStampText: {
    fontSize: 12,
    color: 'white',
  },
  triangle: {
    borderTopColor: '#006994',
  },
})

const recStyles = StyleSheet.create({
  bubble: {
    alignSelf: 'flex-start',
  },
  innerBubble: {
    backgroundColor: '#AEE8C3',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#4a4c4f',
  },
  timeStampText: {
    fontSize: 12,
    color: '#4a4c4f',
  },
  triangle: {
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
