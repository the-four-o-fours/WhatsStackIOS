import React from 'react'
import {StyleSheet, Image, ImageBackground} from 'react-native'

const SingleImage = props => {
  const img = props.navigation.getParam('img', false)
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../Public/bgtile.png')}
      resizeMode="repeat"
    >
      <Image
        resizeMode="contain"
        style={{width: 500, height: 350}}
        source={{uri: img}}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default SingleImage
