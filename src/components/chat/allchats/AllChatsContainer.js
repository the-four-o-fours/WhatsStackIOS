import React from 'react'
import {View, Button} from 'react-native'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'

import AllChatsList from './AllChatsList'
import BottomNavigator from './BottomNavigator'
//AllChatsContainer will just render these two components in a view

import {getNewMessage} from '../../store/actions'

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
  componentDidMount() {}

  signOut = () => {
    firebase.auth().signOut()
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
        {dummyData.map(ele => (
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
})

const mapDispatchToProps = dispatch => ({
  getNewMessage: (message, chatId) => dispatch(getNewMessage(message, chatId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllChats)
