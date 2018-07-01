import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class BottomNavBar extends React.Component {
  goToScreen = screen => {
    this.props.navigation.navigate(`${screen}`)
  }

  render() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={() => this.goToScreen('Contacts')}
        >
          <Icon name="contacts" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.centerButton]}
          onPress={() => this.goToScreen('AccountInfo')}
        >
          <Icon name="account-circle" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={() => this.goToScreen('NewChat')}
        >
          <Icon name="message" color="white" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: 'white',
  },
  leftButton: {
    borderRightWidth: 1,
  },
  centerButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  rightButton: {
    borderLeftWidth: 1,
  },
})
