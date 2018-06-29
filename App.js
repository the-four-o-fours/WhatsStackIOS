import React from 'react'
import {createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {store, persistor} from './src/store'
import Main from './src/components/Main'
import Login from './src/components/auth/Login'
import CreateUser from './src/components/auth/CreateUser'
import MainContainer from './src/components/chat/MainContainer'
import {ActivityIndicator} from 'react-native'

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: ({navigation}) => ({
        title: 'WhatsStack',
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        title: 'Login',
        headerLeft: null,
        gesturesEnabled: false,
      }),
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: ({navigation}) => ({
        title: 'Set display name',
        headerLeft: null,
        gesturesEnabled: false,
      }),
    },
    MainContainer: {
      screen: MainContainer,
      navigationOptions: ({navigation}) => ({
        title: 'WhatsStack',
        headerLeft: null,
        gesturesEnabled: false,
      }),
    },
  },
  {
    initialRouteName: 'Main',
  },
)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
)

export default App
