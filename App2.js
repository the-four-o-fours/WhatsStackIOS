import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+1',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+1',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({ confirmResult, message: 'Code has been sent!' })
      )
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
        })
      );
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}` })
        );
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>
        {message}
      </Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          color="#841584"
          onPress={this.confirmCode}
        />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && (
          <ScrollView>
            <View style={styles.container}>
              <Image
                source={require('./assets/RNFirebase.png')}
                style={[styles.logo]}
              />
              <Text style={styles.welcome}>
                Welcome to the React Native{'\n'}Firebase starter project!
              </Text>
              <Text style={styles.instructions}>
                To get started, edit App.js
              </Text>
              {Platform.OS === 'ios' ? (
                <Text style={styles.instructions}>
                  Press Cmd+R to reload,{'\n'}
                  Cmd+D or shake for dev menu
                </Text>
              ) : (
                <Text style={styles.instructions}>
                  Double tap R on your keyboard to reload,{'\n'}
                  Cmd+M or shake for dev menu
                </Text>
              )}
              <View style={styles.modules}>
                <Text style={styles.modulesHeader}>
                  The following Firebase modules are enabled:
                </Text>
                {firebase.admob.nativeModuleExists && (
                  <Text style={styles.module}>Admob</Text>
                )}
                {firebase.analytics.nativeModuleExists && (
                  <Text style={styles.module}>Analytics</Text>
                )}
                {firebase.auth.nativeModuleExists && (
                  <Text style={styles.module}>Authentication</Text>
                )}
                {firebase.crashlytics.nativeModuleExists && (
                  <Text style={styles.module}>Crashlytics</Text>
                )}
                {firebase.firestore.nativeModuleExists && (
                  <Text style={styles.module}>Cloud Firestore</Text>
                )}
                {firebase.messaging.nativeModuleExists && (
                  <Text style={styles.module}>Cloud Messaging</Text>
                )}
                {firebase.links.nativeModuleExists && (
                  <Text style={styles.module}>Dynamic Links</Text>
                )}
                {firebase.iid.nativeModuleExists && (
                  <Text style={styles.module}>Instance ID</Text>
                )}
                {firebase.notifications.nativeModuleExists && (
                  <Text style={styles.module}>Notifications</Text>
                )}
                {firebase.perf.nativeModuleExists && (
                  <Text style={styles.module}>Performance Monitoring</Text>
                )}
                {firebase.database.nativeModuleExists && (
                  <Text style={styles.module}>Realtime Database</Text>
                )}
                {firebase.config.nativeModuleExists && (
                  <Text style={styles.module}>Remote Config</Text>
                )}
                {firebase.storage.nativeModuleExists && (
                  <Text style={styles.module}>Storage</Text>
                )}
                <Text>{JSON.stringify(user)}</Text>
                <Button title="Sign Out" color="red" onPress={this.signOut} />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
