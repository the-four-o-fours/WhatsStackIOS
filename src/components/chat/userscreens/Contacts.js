import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'

class Contacts extends React.Component {
  goToConvo = uid => {
    this.props.navigation.navigate('Chat', {
      uid,
    })
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
                onPress={() => this.goToConvo(contact.uid)}
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
})

export default connect(
  mapStateToProps,
  null,
)(Contacts)
