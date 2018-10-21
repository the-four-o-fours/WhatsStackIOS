import React from 'react'
import {StyleSheet, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

import AllChats from './AllChats'
import Contacts from './Contacts'
import AccountInfo from './AccountInfo'
import BottomNavBar from './BottomNavBar'
import firebase from 'react-native-firebase'

class MainScreensContainer extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('title', 'WhatsStack'),
    headerStyle: {
      backgroundColor: '#20AAB2',
    },
    headerTintColor: '#fff',
  })

  state = {
    chats: [],
    screen: 'AllChats',
  }

  setTitle = () => {
    const {setParams} = this.props.navigation
    if (this.state.screen === 'AllChats') setParams({title: 'WhatsStack'})
    else if (this.state.screen === 'Contacts') setParams({title: 'Contacts'})
    else if (this.state.screen === 'AccountInfo')
      setParams({title: 'Account Info'})
  }

  async componentDidMount() {
    this.setTitle()
    try {
      const chats = await this.findChats()
      this.setState({chats})
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.messages !== prevProps.messages) {
        const chats = await this.findChats()
        this.setState({chats})
      }
    } catch (err) {
      console.log(err)
    }
  }

  findChats = async () => {
    const chats = await Promise.all(
      Object.keys(this.props.messages).map(async chatId => {
        try {
          const chat = {
            uid: chatId,
            members: this.props.messages[chatId].members,
          }
          if (chatId.length === 28) {
            //11Chat
            const contactInfo = this.props.contacts[chatId]
              ? this.props.contacts[chatId]
              : await this.findAnonymous(chatId)
            chat.displayName = contactInfo.displayName
            chat.img = contactInfo.img
          } else {
            //GChat
            chat.displayName = 'Group Chat'
            // chat.img = //TODO ADD GENERIC GROUP IMAGE
          }
          const messages = this.props.messages[chatId].conversation
          chat.lastMessage = messages[messages.length - 1]
          chat.seen = this.props.messages[chatId].seen
          return chat
        } catch (err) {
          console.log(err)
        }
      }),
    )
    chats.sort((a, b) => b.lastMessage.timeStamp - a.lastMessage.timeStamp)
    return chats
  }

  findAnonymous = async id => {
    try {
      const defaultImg = this.props.user.default
      const user = {
        uid: id,
      }
      await firebase
        .database()
        .ref(`/Users/${id}`)
        .once('value')
        .then(snapshot => {
          const data = snapshot.val()
          user.displayName = data.displayName
          user.img = defaultImg
        })
      return user
    } catch (err) {
      console.log(err)
    }
  }

  setScreen = screen => {
    this.setState({screen}, () => this.setTitle())
  }

  render() {
    // console.log('USER', this.props.user)
    // console.log('MESSAGES', this.props.messages)
    // console.log('CONTACTS', this.props.contacts)
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
        {this.state.screen === 'AllChats' ? (
          <AllChats
            navigation={this.props.navigation}
            chats={this.state.chats}
          />
        ) : this.state.screen === 'Contacts' ? (
          <Contacts
            navigation={this.props.navigation}
            resetScreen={() => this.setScreen('AllChats')}
          />
        ) : (
          <AccountInfo />
        )}
        <BottomNavBar
          screen={this.state.screen}
          displayChats={() => this.setScreen('AllChats')}
          displayContacts={() => this.setScreen('Contacts')}
          displayAccountInfo={() => this.setScreen('AccountInfo')}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
})

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
  messages: state.messages,
})

export default connect(mapStateToProps)(MainScreensContainer)
