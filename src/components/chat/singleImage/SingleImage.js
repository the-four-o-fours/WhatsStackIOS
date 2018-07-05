import React from 'react'
import {StyleSheet, Image, View} from 'react-native'

const SingleImage = props => {
  const img = props.navigation.getParam('img', false)
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{width: 500, height: 350}}
        source={{uri: img}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default SingleImage
