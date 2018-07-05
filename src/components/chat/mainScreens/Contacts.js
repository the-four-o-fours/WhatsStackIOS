import React from 'react'
import {connect} from 'react-redux'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import {ListItem} from 'react-native-elements'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingContacts: this.props.contactsArr,
      members: [],
      startingGChat: false,
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
    this.props.navigation.navigate('GChat', {
      gUid: 'a uidhhhhhhhhhhhhhhhhhhhhhhhhhh', //must auto-generate 28char
      startsConvo: true,
      members: this.state.members,
      title: 'Group Chat',
    })
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

  renderItem = ({item}) => {
    console.log(item)
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
          // style={}
          onPress={() => {
            const startingGChat = !this.state.startingGChat
            this.setState({startingGChat}, () =>
              console.log(this.state.startingGChat),
            )
          }}
        >
          <View>
            <Text>Start Group Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          // style={}
          onPress={() => console.log(this.state)}
        >
          <View>
            <Text>LOGGING BUTTON</Text>
          </View>
        </TouchableOpacity>
        {this.state.members.length > 1 ? (
          <TouchableOpacity
            // style={}
            onPress={() => this.goToGChat()}
          >
            <View>
              <Text>Go to Group Chat</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <FlatList
          data={this.state.matchingContacts}
          extraData={this.state.members}
          renderItem={this.renderItem}
          keyExtractor={({uid}) => uid}
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
})

const mapStateToProps = state => ({
  contactsArr: state.contactsArr.sort((a, b) => {
    return a.phoneName.toLowerCase() >= b.phoneName.toLowerCase() ? 1 : -1
  }),
})

export default connect(
  mapStateToProps,
  null,
)(Contacts)
