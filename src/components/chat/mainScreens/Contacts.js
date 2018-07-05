import React from 'react'
import {connect} from 'react-redux'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import {ListItem} from 'react-native-elements'

import {populateContacts} from '../../../store/actions'
import rsa from '../../rsa'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingContacts: this.props.contactsArr,
      refreshing: false,
      members: [],
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
    this.props.navigation.navigate('Chat', {
      uid: item.uid,
      title: item.displayName,
      publicKey: item.publicKey,
    })
  }

  goToGChat = () => {
    this.props.resetScreen()
    const gUid = this.generateUid()
    this.props.navigation.navigate('GChat', {
      gUid,
      startsConvo: true,
      members: this.state.members,
      title: 'Group Chat',
    })
  }

  generateUid = () => {
    const bits = 1024
    const exponent = '10001' // must be a string
    rsa.generate(bits, exponent)
    const gUid = rsa.getPublicString().slice(5, 33)
  }

  //startgroup button on top of page under search bar
  //hitting it flips startingGChat

  handleContactPress = item => {
    if (this.state.startingGChat) {
      this.selectOrDeselectMember(item)
    } else {
      this.goToChat(item)
    }
  }

  selectOrDeselectMember = item => {
    let members = []
    if (this.state.members.includes(item.uid)) {
      members = this.state.members.filter(memberUid => memberUid !== item.uid)
    } else {
      members = [...this.state.members, item.uid]
    }
    this.setState({members})
  }

  updateContacts = () => {
    this.setState({refreshing: true})
    this.props.populateContacts().then(_ => this.setState({refreshing: false}))
  }

  renderItem = ({item}) => {
    return (
      <ListItem
        containerStyle={
          this.state.members.includes(item.uid)
            ? {backgroundColor: '#AEE8C3'}
            : {}
        }
        roundAvatar
        title={`${item.phoneName} (${item.displayName})`}
        avatar={{
          uri: item.img,
        }}
        onPress={() => this.handleContactPress(item)}
        onLongPress={() => {
          console.log('Long press show drawer')
        }}
      />
    )
  }

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={64}
      >
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
            const startingGChat = !this.state.startingGChat
            if (!startingGChat) {
              this.setState({members: []})
            }
            this.setState({startingGChat})
          }}
        >
          {!this.state.startingGChat ? (
            <Text style={{fontSize: 16}}>Start Group Chat</Text>
          ) : (
            <Text style={{fontSize: 16}}>Cancel</Text>
          )}
        </TouchableOpacity>
        {this.state.members.length > 1 ? (
          <TouchableOpacity
            style={[styles.groupButton, {backgroundColor: '#20AAB2'}]}
            onPress={() => this.goToGChat()}
          >
            <Text style={{fontSize: 16}}>Go to Group Chat</Text>
          </TouchableOpacity>
        ) : null}
        <FlatList
          data={this.state.matchingContacts}
          extraData={this.state.members}
          renderItem={this.renderItem}
          keyExtractor={({uid}) => uid}
          refreshing={this.state.refreshing}
          onRefresh={this.updateContacts}
        />
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

const mapStateToProps = state => ({
  contactsArr: state.contactsArr.sort((a, b) => {
    return a.phoneName.toLowerCase() >= b.phoneName.toLowerCase() ? 1 : -1
  }),
})

const mapDispatchToProps = dispatch => ({
  populateContacts: () => dispatch(populateContacts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts)
