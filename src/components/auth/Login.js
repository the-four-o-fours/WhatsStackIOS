import React, {Component} from 'react'
import {View, Button, Text, TextInput} from 'react-native'
import firebase from 'react-native-firebase'

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
      .then(confirmResult => this.setState({confirmResult, message: 'Code has been sent!'}),)
      .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}),)
  }

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(_ => {
          this.setState({message: 'Code Confirmed!'})
        })
        .catch(error => this.setState({message: `Code Confirm Error: ${error.message}`}),)
    }
  }

  renderPhoneNumberInput() {
    const {phoneNumber} = this.state

    return (
      <View style={{
        padding: 25
      }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{
          height: 40,
          marginTop: 15,
          marginBottom: 15
        }}
          onChangeText={value => this.setState({phoneNumber: value})}
          placeholder="Phone number ... "
          value={phoneNumber}/>
        <Button title="Sign In" color="green" onPress={this.signIn}/>
      </View>
    )
  }

  renderMessage() {
    const {message} = this.state

    if (!message.length) 
      return null

    return (
      <Text
        style={{
        padding: 5,
        backgroundColor: '#000',
        color: '#fff'
      }}>
        {message}
      </Text>
    )
  }

  renderVerificationCodeInput() {
    const {codeInput} = this.state

    return (
      <View style={{
        marginTop: 25,
        padding: 25
      }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{
          height: 40,
          marginTop: 15,
          marginBottom: 15
        }}
          onChangeText={value => this.setState({codeInput: value})}
          placeholder="Code ... "
          value={codeInput}/>
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode}/>
      </View>
    )
  }

  render() {
    const {user, confirmResult} = this.state
    return (
      <View style={{
        flex: 1
      }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
      </View>
    )
  }
}

export default Login
