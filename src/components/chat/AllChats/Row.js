import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import data from './demoData'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const Row = () => (
  <View style={styles.container}>
    {/* <Image source={{ uri: props.picture}} style={styles.photo} /> */}
    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/47.jpg'}} style={styles.photo} />
    <Text style={styles.text}>
      {`${data.name.first} ${data.name.last}`}
      Bobby Bushay
    </Text>
  </View>
);

export default Row;
