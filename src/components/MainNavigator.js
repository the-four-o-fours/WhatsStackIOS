import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats/AllChatsContainer'
import Chat from './chat/singlechat/Chat'
import Contacts from './chat/userscreens/Contacts'

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
      navigationOptions: ({navigation}) => ({}),
    },
    Contacts: {
      screen: Contacts,
      navigationOptions: ({navigation}) => ({
        title: 'Contacts',
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
