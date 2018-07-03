import React from 'react'
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'

import AllChats from './AllChats'
import Contacts from './Contacts'
import AccountInfo from './AccountInfo'
import BottomNavBar from './BottomNavBar'
import firebase from 'react-native-firebase'

class MainScreensContainer extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('title', 'WhatsStack'),
  })

  state = {
    chats: [],
    displayContacts: false,
    displayAccountInfo: false,
    reset: false,
  }

  getTitle = () => {
    const {setParams} = this.props.navigation
    if (this.state.displayContacts && !this.state.displayAccountInfo)
      setParams({title: 'Contacts'})
    else if (this.state.displayAccountInfo)
      setParams({title: 'Account Settings'})
    else setParams({title: 'WhatsStack'})
  }

  async componentDidMount() {
    this.getTitle()
    try {
      const chats = await this.findChats()
      this.setState({chats})
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.messages !== prevProps.messages) {
        const chats = await this.findChats()
        this.setState({chats})
      }
    } catch (error) {
      console.log(error)
    }
  }

  findChats = async () => {
    const friendIds = Object.keys(this.props.messages)
    const chats = await Promise.all(
      friendIds.map(async id => {
        try {
          let chat
          if (this.props.contactsHash[id]) {
            chat = this.props.contactsHash[id]
          } else {
            chat = await this.findAnonymous(id)
          }
          const messages = this.props.messages[id].conversation
          chat.seen = this.props.messages[id].seen
          chat.lastMessage = messages[messages.length - 1]
          return chat
        } catch (error) {
          console.log(error)
        }
      }),
    )
    chats.sort((a, b) => b.lastMessage.timeStamp - a.lastMessage.timeStamp)
    return chats
  }

  findAnonymous = async id => {
    try {
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
          user.publicKey = data.publicKey
          user.phoneNumber = data.phoneNumber
          user.img = data.img
        })
      return user
    } catch (error) {
      console.log(error)
    }
  }

  displayChats = () => {
    this.setState(
      {
        displayContacts: false,
        displayAccountInfo: false,
        reset: false,
      },
      () => this.getTitle(),
    )
  }

  displayContacts = () => {
    this.setState(
      {
        displayContacts: true,
        displayAccountInfo: false,
        reset: false,
      },
      () => this.getTitle(),
    )
  }

  displayAccountInfo = () => {
    this.setState(
      {
        displayContacts: false,
        displayAccountInfo: true,
        reset: false,
      },
      () => this.getTitle(),
    )
  }

  resetScreen = () => {
    this.setState(
      {
        displayContacts: false,
        displayAccountInfo: false,
        reset: true,
      },
      () => this.getTitle(),
    )
  }

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}
        style={styles.container}
      >
        {this.state.displayContacts ? (
          <Contacts
            navigation={this.props.navigation}
            resetScreen={this.resetScreen}
          />
        ) : this.state.displayAccountInfo ? (
          <AccountInfo />
        ) : (
          <AllChats
            navigation={this.props.navigation}
            chats={this.state.chats}
          />
        )}
        <BottomNavBar
          reset={this.state.reset}
          displayChats={this.displayChats}
          displayContacts={this.displayContacts}
          displayAccountInfo={this.displayAccountInfo}
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
  contactsHash: state.contactsHash,
  messages: state.messages,
})

export default connect(mapStateToProps)(MainScreensContainer)
