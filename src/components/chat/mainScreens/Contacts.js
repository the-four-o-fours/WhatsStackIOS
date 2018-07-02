import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'

class Contacts extends React.Component {
  goToConvoOrNewMessage = (uid, title) => {
    if (this.props.messages[uid]) {
      this.props.navigation.navigate('Chat', {
        uid,
        title,
      })
    } else {
      this.props.navigation.navigate('NewChat')
      //we should add something so it starts you on a draft of a message to that user
      //once we actually finish the newchat component and understand how it will work
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.contactsArr.length ? (
          <View>
            {this.props.contactsArr.map(contact => (
              <ListItem
                key={contact.uid}
                title={`${contact.phoneName} (${contact.displayName})`}
                onPress={() =>
                  this.goToConvoOrNewMessage(contact.uid, contact.displayName)
                }
              />
            ))}
          </View>
        ) : (
          <Text>No Contacts</Text>
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
  contactsArr: state.contactsArr,
  messages: state.messages,
})

export default connect(
  mapStateToProps,
  null,
)(Contacts)
