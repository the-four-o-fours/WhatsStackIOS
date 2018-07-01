import React from 'react'
import {View, Button} from 'react-native'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'

import AllChatsList from './AllChatsList'
import BottomNavigationBar from './BottomNavigationBar'
//AllChatsContainer will just render these two components in a view

import {getNewMessage} from '../../../store/actions'

const dummyData = [
  {
    displayName: 'Chloe',
    phoneNumber: '+19178647990',
    uid: 'mcMNuTXzK5aFP1znT9WfPPttVxH2',
  },
  {
    uid: 'rdMKINrxayVThCXWmKu2OtkniIT2',
    displayName: 'Nousit',
  },
]

class AllChats extends React.Component {
  state = {
    chats: [],
  }

  componentDidMount() {
    const chats = this.findChats()
    this.setState({chats})
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  findChats = () => {
    const friendIds = []
    for (let key in this.props.user) {
      if (key.length > 12) friendIds.push(key)
    }
    return friendIds.map(id => this.props.contacts.find(ele => ele.uid === id))
  }

  goToConvo = uid => {
    this.props.navigation.navigate('Chat', {
      uid,
    })
  }

  render() {
    return (
      <View>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
        <Button
          title="Go to contacts"
          color="blue"
          onPress={() => this.props.navigation.navigate('Contacts')}
        />
        {this.state.chats.map(ele => (
          <ListItem
            key={ele.uid}
            title={ele.displayName}
            onPress={() => this.goToConvo(ele.uid)}
          />
        ))}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllChats)
