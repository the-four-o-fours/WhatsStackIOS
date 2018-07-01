import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/allchats/AllChatsContainer'
import Chat from './chat/singlechat/Chat'
import NewChat from './chat/singlechat'
import Contacts from './chat/userscreens/Contacts'
import AccountInfo from './userscreens/AccountInfo'

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: AllChats,
      navigationOptions: ({navigation}) => ({
        title: 'WhatsStack',
        headerBackTitle: null,
      }),
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({navigation}) => ({
        headerBackTitle: null,
      }),
    },
    NewChat: {
      screen: NewChat,
      navigationOptions: ({navigation}) => ({
        headerBackTitle: null,
      }),
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: ({navigation}) => ({
        title: 'Contacts',
        headerBackTitle: null,
      }),
    },
    AccountInfo: {
      screen: AccountInfo,
      navigationOptions: ({navigation}) => ({
        headerBackTitle: null,
      }),
    },
  },
  {
    order: ['Main', 'Chat', 'Contacts'],
    animationEnabled: true,
    style: {
      backgroundColor: 'green',
    },
  },
)

export default MainNavigator
