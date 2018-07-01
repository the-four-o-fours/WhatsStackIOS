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
          <Contacts />
        ) : this.state.displayAccountInfo ? (
          <AccountInfo />
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
})

export default connect(mapStateToProps)(MainScreensContainer)
