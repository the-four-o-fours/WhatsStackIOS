import React, {Component} from 'react'
import {
  StyleSheet,
  AsyncStorage,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import {Button} from 'react-native-elements'
import firebase from 'react-native-firebase'
import rsa from '../rsa'
import {connect} from 'react-redux'

import download from '../download'
import {getUser} from '../../store/actions'

class CreateUser extends Component {
  state = {
    displayName: '',
    uid: '',
    phoneNumber: '',
  }

  componentDidMount() {
    const {uid, phoneNumber} = firebase.auth().currentUser
    this.setState({uid, phoneNumber}, () => console.log(this.state))
  }

  generateRSAKey = () => {
    const bits = 1024
    const exponent = '10001' // must be a string
    rsa.generate(bits, exponent)
    const privateKey = rsa.getPrivateString()
    const publicKey = rsa.getPublicString()
    return [privateKey, publicKey]
  }

  getDefaultImg = async () => {
    const cloudUrl = await firebase
      .storage()
      .ref('/Users/default.jpg')
      .getDownloadURL()
    const localUrl = await download(cloudUrl)
    return [cloudUrl, localUrl]
  }

  addUserToDB = async () => {
    try {
      const firebaseUser = firebase.database().ref(`/Users/${this.state.uid}`)
      const user = await firebaseUser.once('value')
      const exists = await user.exists()
      const [cloudUrl, localUrl] = await this.getDefaultImg()
      this.props.getUser({img: localUrl})
      if (!exists) {
        const [privateKey, publicKey] = this.generateRSAKey()
        const userObj = {
          ...this.state,
          publicKey,
          img: 'default',
          default: localUrl,
        }
        AsyncStorage.setItem('privateKey', privateKey) //set private keys to async storage
        firebaseUser.set(userObj)
      }
      this.props.userCreated()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={{flex: 1, width: '66%', padding: 22}}
          source={require('../../Public/fullLogo20AAB2.png')}
          resizeMode="contain"
        />
        <TextInput
          autoFocus
          style={styles.formContainer}
          textAlign="center"
          value={this.state.displayName}
          onChangeText={displayName => this.setState({displayName})}
          placeholder="Display Name"
          placeholderTextColor="#808080"
          maxLength={20}
        />

        <Button
          title="Choose Display Name"
          textStyle={{fontSize: 20, fontWeight: 'bold'}}
          backgroundColor="#20AAB2"
          buttonStyle={{borderRadius: 25}}
          onPress={this.addUserToDB}
          icon={{name: 'hand-o-right', type: 'font-awesome', size: 20}}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 20,
    borderRadius: 25,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: 200,
    padding: 10,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  whiteFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 21,
  },
  directionsFont: {
    color: 'grey',
    fontSize: 19,
  },
})

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
})

export default connect(
  null,
  mapDispatchToProps,
)(CreateUser)
