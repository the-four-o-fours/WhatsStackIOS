import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {StyleSheet, Text, AsyncStorage} from 'react-native'
import {Container, Button, Form, Item, Input} from 'native-base'
const RSAKey = require('react-native-rsa')

class CreateUser extends Component {
  state = {
    displayName: '',
    publicKey: '',
    uid: '',
    phoneNumber: '',
  }

  componentDidMount() {
    const {uid, phoneNumber} = firebase.auth().currentUser
    this.setState({uid, phoneNumber})
  }

  generateRSAKey = () => {
    const rsa = new RSAKey()
    const bits = 1024
    const exponent = '10001' // must be a string
    rsa.generate(bits, exponent)
    const privateKey = rsa.getPrivateString()
    const publicKey = rsa.getPublicString()
    return [privateKey, publicKey]
  }

  savePrivKey(privateKey) {
    const privKey = privateKey
    AsyncStorage.setItem('privateKey', privKey)
  }

  getPrivKey = async () => {
    try {
      let key = await AsyncStorage.getItem('privateKey')
      console.log('private key', key)
    } catch (error) {
      alert(error)
    }
  }

  addUserToDB = async () => {
    const fireBaseUser = firebase.database().ref(`/Users/${this.state.uid}`)
    const user = await fireBaseUser.once('value')
    const exists = await user.exists()
    if (exists) {
      console.log('exists')
      console.log('whatdfdf is this', exists)
    } else {
      const [privateKey, publicKey] = this.generateRSAKey()
      const user = {
        uid: this.state.uid,
        phoneNumber: this.state.phoneNumber,
        displayName: this.state.displayName,
        publicKey,
      }

      //set private keys to async storage
      this.savePrivKey(privateKey)
      this.getPrivKey()

      fireBaseUser.set(user)
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item>
            <Input
              value={this.state.displayName}
              onChangeText={displayName => this.setState({displayName})}
              placeholder="Display Name"
            />
          </Item>
          <Button full rounded primary success onPress={this.addUserToDB}>
            <Text
              style={{
                color: 'white',
              }}
            >
              Submit
            </Text>
          </Button>
        </Form>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
})

export default CreateUser
