import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import AllChats from './AllChats'
import BottomNavBar from './BottomNavBar'

class MainScreensContainer extends React.Component {
  state = {
    chats: [],
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
    console.log('chat', chats)
    this.setState({chats})
  }

  goToConvo = (uid, title) => {
    this.props.navigation.navigate('Chat', {
      uid,
      title,
    })
  }

  render() {
    console.log(this.props.messages['607Wni596ZdziVI8Ic93khP2jVA3'])
    return (
      <View style={styles.container}>
        <AllChats goToConvo={this.goToConvo} chats={this.state.chats} />
        <BottomNavBar navigation={this.props.navigation} />
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
