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
    this.setState({uid, phoneNumber})
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
      const [cloudUrl, localUrl] = await this.getDefaultImg
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
        {/* <View style={styles.container}> */}
        <Image
          style={{flex: 1, width: '66%', padding: 22}}
          source={require('../../Public/allTeallogo.png')}
          resizeMode="contain"
        />
        <TextInput
          autoFocus
          style={{
            height: 40,
            marginTop: 15,
            marginBottom: 15,
          }}
          value={this.state.displayName}
          onChangeText={displayName => this.setState({displayName})}
          placeholder="Display Name"
          placeholderTextColor="#808080"
        />

        <Button
          title="Choose Display Name"
          // color="white"
          backgroundColor="#00B183"
          buttonStyle={{borderRadius: 25}}
          onPress={this.addUserToDB}
          icon={{name: 'hand-o-right', type: 'font-awesome'}}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   padding: 10,
  // },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  whiteFont: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    // justifyContent: 'center',
  },
})

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
})

export default connect(
  null,
  mapDispatchToProps,
)(CreateUser)
