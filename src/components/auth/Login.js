import React, {Component} from 'react'
import {
  View,
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
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
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
        .catch(error =>
          this.setState({message: `Code Confirm Error: ${error.message}`}),
        )
    }
  }

  renderPhoneNumberInput() {
    const {phoneNumber} = this.state

    return (
      <View style={styles.loginContainer}>
        <Text style={styles.whiteFont}>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{
            marginTop: 15,
            marginBottom: 15,
            backgroundColor: '#fff',
            borderWidth: 1.33,
            borderStyle: 'solid',
            fontSize: 15,
            borderRadius: 25,
            width: 200,
            padding: 10,
          }}
          onChangeText={value => this.setState({phoneNumber: value})}
          placeholder="Phone number ... "
          value={phoneNumber}
          color="black"
        />
        <Button
          title="Sign In"
          buttonStyle={{borderRadius: 25}}
          onPress={this.signIn}
          icon={{name: 'sign-in', type: 'font-awesome'}}
        />
      </View>
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
        style={{
          marginTop: 25,
          padding: 25,
        }}
      >
        <Text style={styles.whiteFont}>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{
            height: 40,
            marginTop: 15,
            marginBottom: 15,
          }}
          onChangeText={value => this.setState({codeInput: value})}
          placeholder="Code ... "
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          buttonStyle={{borderRadius: 25}}
          icon={{name: 'sign-in', type: 'hand-o-right'}}
          onPress={this.confirmCode}
        />
      </View>
    )
  }

  render() {
    const {user, confirmResult} = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={{flex: 1, width: '66%', padding: 22}}
          source={require('../../Public/whatsStackWhiteLogo1.png')}
          resizeMode="contain"
        />
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
      </KeyboardAvoidingView>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#11D8B0',
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
  },
})
