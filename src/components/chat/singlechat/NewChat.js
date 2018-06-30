import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingRight: 5,
    paddingLeft: 5
  }
})

export default class NewChat extends Component {
  state = {
    uid: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello!
        </Text>
      </View>
    )
  }
}
