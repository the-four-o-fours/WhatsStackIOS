import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

class Contacts extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AccountInfo Dummy Component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Contacts
