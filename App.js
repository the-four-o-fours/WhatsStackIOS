import {createStackNavigator} from 'react-navigation'

import Main from './src/components/Main'
import Login from './src/components/auth/Login'
import CreateUser from './src/components/auth/CreateUser'
import AllChats from './src/components/chat/AllChats'
import Contacts from './src/components/chat/Contacts'
import AllChatsList from './src/components/chat/SectionList/AllChatsList'

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
      }),
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: ({navigation}) => ({
        title: 'Set display name',
      }),
    },
    Chat: {
      screen: AllChatsList,
      navigationOptions: ({navigation}) => ({
        title: 'Chat',
        headerLeft: null,
      }),
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: ({navigation}) => ({
        title: 'Contacts',
      }),
    },
  },
  {
    initialRouteName: 'Main',
  },
)

export default RootNavigator
