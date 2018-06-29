import React, {Component} from 'react'
import {StyleSheet, Text, AsyncStorage} from 'react-native'
import {Container, Button, Form, Item, Input} from 'native-base'
import firebase from 'react-native-firebase'
const RSAKey = require('react-native-rsa')

class CreateUser extends Component {
  state = {
    displayName: '',
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

  addUserToDB = async () => {
    const firebaseUser = firebase.database().ref(`/Users/${this.state.uid}`)
    const user = await firebaseUser.once('value')
    const exists = await user.exists()
    if (!exists) {
      const [privateKey, publicKey] = this.generateRSAKey()
      const user = {
        phoneNumber: this.state.phoneNumber,
        uid: this.state.uid,
        displayName: this.state.displayName,
        publicKey,
      }
      AsyncStorage.setItem('privateKey', privateKey) //set private keys to async storage
      firebaseUser.set(user)
    }
    this.props.userCreated()
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
