import React, {Component} from 'react'
import {
  View,
  // Button,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import firebase from 'react-native-firebase'

import {Button} from 'react-native-elements'

class Login extends Component {
  state = {
    user: null,
    message: '',
    codeInput: '',
    phoneNumber: '+1',
    confirmResult: null,
  }

  signIn = () => {
    const {phoneNumber} = this.state
    this.setState({message: 'Sending code ...'})

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({confirmResult, message: 'Code has been sent!'}),
      )
      .catch(
        this.setState({
          message: `Sorry invalid phone number`,
        }),
      )
  }

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(_ => {
          this.setState({message: 'Code Confirmed!'})
        })
        .catch(
          this.setState({message: `Sorry invalid code`}),
        )
    }
  }

  renderPhoneNumberInput() {
    const {phoneNumber} = this.state

    return (
      // <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.directionsFont}>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={styles.formContainer}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={value => this.setState({phoneNumber: value})}
          placeholder="Phone number ... "
          value={phoneNumber}
          color="black"
        />
        <Button
          title="Sign In"
          buttonStyle={{borderRadius: 25, backgroundColor: '#20AAB2'}}
          textStyle={{fontSize: 20, fontWeight: 'bold'}}
          onPress={this.signIn}
          icon={{name: 'sign-in', type: 'font-awesome', size: 20}}
        />
      </View>
      // </KeyboardAvoidingView>
    )
  }

  renderMessage() {
    const {message} = this.state

    if (!message.length) return null

    return <Text style={styles.whiteFont}>{message}</Text>
  }

  renderVerificationCodeInput() {
    const {codeInput} = this.state

    return (
      <View
        style={styles.loginContainer
        }
      >
        <Text style={styles.directionsFont}>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={styles.formContainer}
          keyboardType="numeric"
          textAlign="center"

          onChangeText={value => this.setState({codeInput: value})}
          placeholder="Code ... "
          value={codeInput}
          keyboardType="numeric"
        />
        <Button
          title="Confirm Code"
          buttonStyle={{borderRadius: 25}}
          textStyle={{fontSize: 20, fontWeight: 'bold'}}
          icon={{name: 'hand-o-right', type: 'font-awesome', size: 20}}
          // color="#841584"
          onPress={this.confirmCode}
        />
      </View>
    )
  }

  render() {
    const {user, confirmResult} = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <View style={styles.container}> */}
        <Image
          style={{flex: 1, width: '77%', padding: 22, marginTop: 125}}
          // source={require('../../Public/wLogoT.png')}
          source={require('../../Public/fullLogo20AAB2.png')}
          resizeMode="contain"
        />
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
        {/* </View> */}
      </KeyboardAvoidingView>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    // backgroundColor: '#00B183',
    backgroundColor: '#fff',
    width: 'auto',
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
    // fontSize: 16
  },
  whiteFont: {
    // color: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 21,
    // justifyContent: 'center',
  },
  directionsFont: {
    color: 'grey',
    // fontWeight: 'bold',
    fontSize: 20,
  },
})