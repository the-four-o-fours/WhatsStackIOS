import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {StyleSheet, View, ActivityIndicator} from 'react-native'

import Login from './auth/Login'
import CreateUser from './auth/CreateUser'
import MainContainer from './MainContainer'

class Main extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      loading: true,
      isLoggedIn: false,
      isInDatabase: false,
      uid: '',
    }
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const isInDatabase = await this.userInDatabase(user.uid)
        this.setState({
          isLoggedIn: true,
          isInDatabase,
          uid: user.uid,
          loading: false,
        })
      } else {
        this.setState({
          isLoggedIn: false,
          loading: false,
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }

  userInDatabase = async uid => {
    const firebaseUser = firebase.database().ref(`/Users/${uid}`)
    const user = await firebaseUser.once('value')
    const exists = await user.exists()
    return exists
  }

  userCreated = () => {
    this.setState({isInDatabase: true})
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    } else if (this.state.isLoggedIn && this.state.isInDatabase) {
      return <MainContainer uid={this.state.uid} />
    } else if (this.state.isLoggedIn && !this.state.isInDatabase) {
      return <CreateUser userCreated={this.userCreated} />
    } else {
      return <Login />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})

export default Main
