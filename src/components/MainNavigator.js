import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats'
import Chat from './chat/Chat'
import Contacts from './chat/Contacts'

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
    order: ['Main', 'Chat', 'Contacts'], //I changed this trying to adapt Nousit's navigator and I think I fucked it up -spencer
    animationEnabled: true,
    style: {
      backgroundColor: 'green',
    },
  },
)

export default MainNavigator
