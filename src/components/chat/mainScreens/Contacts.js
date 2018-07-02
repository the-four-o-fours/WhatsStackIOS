import React from 'react'
import {connect} from 'react-redux'
import {
  FlatList,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import {ListItem} from 'react-native-elements'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingContacts: this.props.contactsArr,
    }
  }

  goToConvo = item => {
    this.props.navigation.navigate('Chat', {
      uid: item.uid,
      title: item.title,
      publicKey: item.publicKey,
    })
  }

  searchFor = contactName => {
    const matchingContacts = this.props.contactsArr.filter(contact =>
      contact.displayName.toLowerCase().startsWith(contactName.toLowerCase()),
    )
    this.setState({
      matchingContacts,
    })
  }

  extractKey = ({uid}) => uid
  renderItem = ({item}) => {
    return (
      <ListItem
        roundAvatar
        title={`${item.phoneName} (${item.displayName})`}
        avatar={{uri: item.img}}
        onPress={() => this.goToConvo(item)}
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
        <FlatList
          data={this.state.matchingContacts}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 24,
  },
})

const mapStateToProps = state => ({
  contactsArr: state.contactsArr,
})

export default connect(
  mapStateToProps,
  null,
)(Contacts)
