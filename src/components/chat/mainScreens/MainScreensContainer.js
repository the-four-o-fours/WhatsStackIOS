import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import AllChats from './AllChats'
import Contacts from './Contacts'
import AccountInfo from './AccountInfo'
import BottomNavBar from './BottomNavBar'

class MainScreensContainer extends React.Component {
  state = {
    chats: [],
    displayContacts: false,
    displayAccountInfo: false,
  }

  componentDidMount() {
    this.findChats()
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages !== prevProps.messages) {
      this.findChats()
    }
  }

  findChats = () => {
    const friendIds = Object.keys(this.props.messages)
    const chats = friendIds
      .map(id => {
        const chat = this.props.contactsHash[id]
        const messages = this.props.messages[id].conversation
        chat.seen = this.props.messages[id].seen
        chat.lastMessage = messages[messages.length - 1]
        return chat
      })
      .sort((a, b) => b.lastMessage.timeStamp - a.lastMessage.timeStamp)
    this.setState({chats})
  }

  displayChats = () => {
    this.setState({
      displayContacts: false,
      displayAccountInfo: false,
    })
  }

  displayContacts = () => {
    this.setState({
      displayContacts: true,
      displayAccountInfo: false,
    })
  }

  displayAccountInfo = () => {
    this.setState({
      displayContacts: false,
      displayAccountInfo: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.displayContacts ? (
          <Contacts navigation={this.props.navigation} />
        ) : this.state.displayAccountInfo ? (
          <AccountInfo user={this.props.user} />
        ) : (
          <AllChats
            navigation={this.props.navigation}
            chats={this.state.chats}
          />
        )}
        <BottomNavBar
          navigation={this.props.navigation}
          displayChats={this.displayChats}
          displayContacts={this.displayContacts}
          displayAccountInfo={this.displayAccountInfo}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

const mapStateToProps = state => ({
  user: state.user,
  contactsHash: state.contactsHash,
  messages: state.messages,
})

export default connect(mapStateToProps)(MainScreensContainer)
