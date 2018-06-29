import React, {Component} from 'react'
import firebase from 'react-native-firebase'

import Login from './auth/Login'
import CreateUser from './auth/CreateUser'
import MainContainer from './MainContainer'

class Main extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = null
    this.state = {
      isLoggedIn: false,
      isInDatabase: false,
      uid: '',
    }
  }

  userCreated = () => {
    this.setState({isInDatabase: true})
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const isInDatabase = this.userInDatabase()
        this.setState({isLoggedIn: true, isInDatabase, uid: user.uid})
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }

  userInDatabase = async () => {
    const {uid} = firebase.auth().currentUser
    const firebaseUser = firebase.database().ref(`/Users/${uid}`)
    const user = await firebaseUser.once('value')
    const exists = await user.exists()
    return exists
  }

  render() {
    if (this.state.isLoggedIn && this.state.isInDatabase) {
      return <MainContainer uid={this.state.uid} />
    } else if (this.state.isLoggedIn) {
      return <CreateUser userCreated={this.userCreated} />
    } else {
      return <Login />
    }
  }
}

export default Main
