import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import AllChatsList from './AllChatsList'
import BottomNavBar from './BottomNavBar'

class AllChatsContainer extends React.Component {
  state = {
    chats: [],
  }

  componentDidMount() {
    this.findChats()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.findChats()
    }
  }

  findChats = () => {
    const friendIds = []
    for (let key in this.props.user) {
      if (key.length > 12) friendIds.push(key)
    }
    const chats = friendIds.map(id => this.props.contactsHash[id])
    this.setState({chats})
  }

  goToConvo = (uid, title) => {
    this.props.navigation.navigate('Chat', {
      uid,
      title,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AllChatsList goToConvo={this.goToConvo} chats={this.state.chats} />
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
})

export default connect(mapStateToProps)(AllChatsContainer)
