import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ReversedFlatList from 'react-native-reversed-flat-list'

import {connect} from 'react-redux'

import ChatBubble from './ChatBubble'

import {sendMessage, updateMembers, sendImage} from './chatLogic'
import {findAnonymous} from '../../../logic'
import {seenMessages} from '../../../store/actions'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    /* eslint-disable react/no-unused-state */
    //They're used in the imported logic functions
    this.state = {
      uid: this.props.navigation.getParam('uid', false),
      members: this.props.navigation.getParam('members', []),
      startsConvo: this.props.navigation.getParam('startsConvo', false),
      displayNames: {},
      isSendingImg: false,
      newMessage: '',
      height: 29.5, //MagicNo RN always sets height to this no matter what
    }
    /* eslint-enable react/no-unused-state */

    this.findAnonymous = findAnonymous.bind(this)
    this.sendMessage = sendMessage.bind(this)
    this.updateMembers = updateMembers.bind(this)
    this.sendImage = sendImage.bind(this)
  }

  async componentDidMount() {
    try {
      const displayNames = {}
      const promises = []
      this.state.members
        .filter(member => member.uid !== this.props.user.uid)
        .forEach(member => {
          const contact = this.props.contacts[member.uid]
          if (contact) {
            displayNames[member.uid] = contact.displayName
          } else {
            promises.push(this.findAnonymous(member.uid))
          }
        })
      const anonymouses = await Promise.all(promises)
      anonymouses.forEach(anon => {
        displayNames[anon.uid] = anon.displayName
      })
      this.setState({displayNames})
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    if (this.props.messages[this.state.uid]) {
      this.props.seenMessages(this.state.uid)
    }
  }

  //should also run onPress for a button for adding members
  //needs functions for pushing new members into this.state.members
  //also slicing them out
  //also a whole sub-comp similar to the contacts arr where you can add members
  //or cancel the add
  //Or we could just not support adding people to groups.

  render() {
    const {uid, members, displayNames, newMessage, height} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <ImageBackground
          style={{flex: 1}}
          source={require('../../../Public/bgtile.png')}
          resizeMode="repeat"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {this.props.messages[uid] &&
            Object.keys(displayNames).length > 0 ? (
              <ReversedFlatList
                style={styles.chats}
                data={this.props.messages[uid].conversation}
                keyExtractor={({timeStamp}) => timeStamp}
                renderItem={({item}) => (
                  <ChatBubble
                    message={item}
                    displayName={displayNames[item.sender]}
                    isGChat={members.length > 2}
                    user={this.props.user}
                    navigation={this.props.navigation}
                  />
                )}
              />
            ) : (
              <View>
                <Text style={styles.noMessages}>Start a conversation ◉‿◉</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        </ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.sendImage('camera')
            }}
          >
            <Icon name="ios-camera" size={35} color="#006994" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.sendImage('gallery')
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
            onChangeText={newText => this.setState({newMessage: newText})}
            onContentSizeChange={event => {
              this.setState({height: event.nativeEvent.contentSize.height + 10})
            }}
            onSubmitEditing={() => {
              this.sendMessage()
              this.setState({height: 29.5})
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            disabled={newMessage.length === 0}
            onPress={() => {
              this.sendMessage()
              this.setState({height: 29.5})
            }}
          >
            <Icon name="ios-send" size={35} color="#006994" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  noMessages: {
    fontSize: 32,
    color: '#006994',
    alignSelf: 'center',
    paddingTop: 250,
  },
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

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  seenMessages: chatId => dispatch(seenMessages(chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
