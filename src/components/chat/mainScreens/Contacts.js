import React from 'react'
import {connect} from 'react-redux'
import {
  View,
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
    this.props.resetScreen()
    this.props.navigation.navigate('Chat', {
      uid: item.uid,
      title: item.displayName,
      publicKey: item.publicKey,
    })
  }

  searchFor = contactName => {
    const matchingContacts = this.props.contactsArr.filter(contact =>
      contact.phoneName.toLowerCase().startsWith(contactName.toLowerCase()),
    )
    this.setState({matchingContacts})
  }

  extractKey = ({uid}) => uid
  renderItem = ({item}) => {
    return (
      <ListItem
        roundAvatar
        title={`${item.phoneName} (${item.displayName})`}
        avatar={{
          uri: item.img,
        }}
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
        <View
          style={{
            padding: 5,
          }}
        >
          <TextInput
            style={styles.input}
            autoFocus={false}
            placeholder="Contact Name"
            value={this.state.searchFor}
            onChangeText={contactName => this.searchFor(contactName)}
          />
        </View>
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
