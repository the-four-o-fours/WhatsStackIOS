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
          } else if (id.slice(0, 5) === 'GROUP') {
            //this chaos is because members is undefined for a second before updating from the
            //store and getting an accurate array and having members be undefined redscreens it
            //you GOTTA fix this later, perhaps by dispatching an action that just sets members in redux
            if (this.props.messages[id].members) {
              chat = {
                members: this.props.messages[id].members,
                gUid: id,
              }
            } else {
              chat = {
                members: [],
                gUid: id,
              }
            }
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
          user.publicKey = data.publicKey
          user.phoneNumber = data.phoneNumber
          user.img = defaultImg
        })
      return user
    } catch (error) {
      console.log(error)
    }
  }

  setScreen = screen => {
    this.setState({screen}, () => this.setTitle())
  }

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}
        style={styles.container}
      >
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
  contactsHash: state.contactsHash,
  messages: state.messages,
})

export default connect(mapStateToProps)(MainScreensContainer)
