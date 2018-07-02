import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import {ListItem} from 'react-native-elements'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingContacts: [],
    }
  }

  componentDidMount() {
    this.setState({
      matchingContacts: this.props.contactsArr,
    })
  }

  goToConvo = (uid, title) => {
    this.props.navigation.navigate('Chat', {
      uid,
      title,
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
        {this.props.contactsArr.length ? (
          <View>
            {this.state.matchingContacts.map(contact => (
              <ListItem
                key={contact.uid}
                title={`${contact.phoneName} (${contact.displayName})`}
                onPress={() => this.goToConvo(contact.uid, contact.displayName)}
              />
            ))}
          </View>
        ) : (
          <Text>No Contacts</Text>
        )}
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
  user: state.user,
  contactsArr: state.contactsArr,
  messages: state.messages,
})

export default connect(
  mapStateToProps,
  null,
)(Contacts)
