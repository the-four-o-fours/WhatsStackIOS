import React from 'react'
import {connect} from 'react-redux'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {ListItem} from 'react-native-elements'
import uuidv4 from 'uuid/v4'

import {populateContacts} from '../../../store/actions'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingContacts: this.props.contactsArr,
      members: [
        {uid: this.props.user.uid, publicKey: this.props.user.publicKey},
      ],
      refreshing: false,
      startingGChat: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contactsArr !== this.props.contactsArr) {
      this.setState({matchingContacts: this.props.contactsArr})
    }
  }

  searchFor = contactName => {
    const matchingContacts = this.props.contactsArr.filter(contact =>
      contact.phoneName.toLowerCase().startsWith(contactName.toLowerCase()),
    )
    this.setState({matchingContacts})
  }

  goToChat = item => {
    this.props.resetScreen()
    this.props.navigation.navigate('GChat', {
      uid: this.state.startingGChat ? uuidv4() : item.uid,
      title: this.state.startingGChat ? 'Group Chat' : item.displayName,
      members: this.state.members,
      startsConvo: true,
    })
  }

  handleContactPress = item => {
    const members = this.state.members.filter(member => member.uid !== item.uid)
    if (members.length === this.state.members.length) {
      members.push({uid: item.uid, publicKey: item.publicKey})
    }
    this.setState({members}, () => {
      if (!this.state.startingGChat) {
        this.goToChat(item)
      }
    })
  }

  updateContacts = () => {
    this.setState({refreshing: true}, async () => {
      await this.props.populateContacts()
      this.setState({refreshing: false})
    })
  }

  renderItem = ({item}) => (
    <ListItem
      containerStyle={
        this.state.members.some(member => member.uid === item.uid) && {
          backgroundColor: '#AEE8C3',
        }
      }
      roundAvatar
      title={`${item.phoneName} (${item.displayName})`}
      avatar={{
        uri: item.img,
      }}
      onPress={() => this.handleContactPress(item)}
    />
  )

  render() {
    console.log(this.state)
    return (
      <KeyboardAvoidingView enabled behavior="padding">
        <TextInput
          style={styles.input}
          autoFocus={false}
          placeholder="Contact Name"
          value={this.state.searchFor}
          onChangeText={contactName => this.searchFor(contactName)}
        />
        <TouchableOpacity
          style={styles.groupButton}
          onPress={() => {
            Keyboard.dismiss()
            this.setState(state => {
              const members = state.startingGChat
                ? [
                    {
                      uid: this.props.user.uid,
                      publicKey: this.props.user.publicKey,
                    },
                  ]
                : state.members
              return {startingGChat: !state.startingGChat, members}
            })
          }}
        >
          {!this.state.startingGChat ? (
            <Text style={{fontSize: 16}}>Start Group Chat</Text>
          ) : (
            <Text style={{fontSize: 16}}>Cancel</Text>
          )}
        </TouchableOpacity>
        <FlatList
          data={this.state.matchingContacts}
          extraData={this.state.members}
          renderItem={this.renderItem}
          keyExtractor={({uid}) => uid}
          refreshing={this.state.refreshing}
          onRefresh={this.updateContacts}
        />
        {this.state.members.length > 2 && (
          <TouchableOpacity
            style={[styles.groupButton, {backgroundColor: '#20AAB2'}]}
            onPress={() => this.goToChat()}
          >
            <Text style={{fontSize: 16}}>Go to Group Chat</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    margin: 5,
  },
  groupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8FDFF',
    height: 50,
  },
})

const mapStateToProps = state => {
  const contactsArr = []
  Object.keys(state.contacts).forEach(key => {
    contactsArr.push(state.contacts[key])
  })
  contactsArr.sort((a, b) => {
    return a.phoneName.toLowerCase() >= b.phoneName.toLowerCase() ? 1 : -1
  })
  return {
    contactsArr,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  populateContacts: () => dispatch(populateContacts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts)
