import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/allchats/AllChatsContainer'
import Chat from './chat/singlechat/Chat'
import NewChat from './chat/singlechat/NewChat'
import Contacts from './chat/userscreens/Contacts'
import AccountInfo from './chat/userscreens/AccountInfo'

const MainNavigator = createStackNavigator({
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
  Contacts: {
    screen: Contacts,
    navigationOptions: ({navigation}) => ({
      title: 'Contacts',
      headerBackTitle: null,
    }),
  },
  NewChat: {
    screen: NewChat,
    navigationOptions: ({navigation}) => ({
      title: 'New Message',
      headerBackTitle: null,
    }),
  },
  AccountInfo: {
    screen: AccountInfo,
    navigationOptions: ({navigation}) => ({
      title: 'Account Information',
      headerBackTitle: null,
    }),
  },
})

export default MainNavigator
