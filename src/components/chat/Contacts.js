import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, Text, Button} from 'react-native'
import {ListItem} from 'react-native-elements'

class ContactsComponent extends Component {
  goToConvo = uid => {
    this.props.navigation.navigate('Chat', {
      uid,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.contacts.length && (
          <View>
            {this.props.contacts.map(contact => (
              <ListItem
                key={contact.uid}
                title={`${contact.displayName} (${contact.phoneName})`}
                onPress={() => this.goToConvo(contact.uid)}
              />
            ))}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
  },
})

const mapStateToProps = state => ({
  user: state.user,
  contacts: state.contacts,
})

export default connect(mapStateToProps)(ContactsComponent)
