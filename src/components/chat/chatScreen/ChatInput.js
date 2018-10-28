import React from 'react'
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const ChatInput = props => {
  const {
    handleTextChange,
    handleSizeChange,
    newMessage,
    height,
    sendImage,
    sendMessage,
  } = props
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          sendImage('camera')
        }}
      >
        <Icon name="ios-camera" size={35} color="#006994" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          sendImage('gallery')
        }}
      >
        <Icon name="ios-add" size={35} color="#006994" />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, {height}]}
        value={newMessage}
        multiline={true}
        autoFocus={false}
        enablesReturnKeyAutomatically={true}
        returnKeyType="send"
        placeholder="..."
        blurOnSubmit={true}
        onChangeText={newText => handleTextChange(newText)}
        onContentSizeChange={event => handleSizeChange(event)}
        onSubmitEditing={sendMessage}
      />
      <TouchableOpacity
        style={styles.submitButton}
        disabled={newMessage.length === 0}
        onPress={sendMessage}
      >
        <Icon name="ios-send" size={35} color="#006994" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    margin: 5,
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingRight: 5,
    paddingLeft: 5,
  },
})

export default ChatInput
