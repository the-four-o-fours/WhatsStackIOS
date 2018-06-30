import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats'
import Chat from './chat/Chat'
import Contacts from './chat/Contacts'

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
    navigationOptions: ({navigation}) => ({}),
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: ({navigation}) => ({
      title: 'Contacts',
      headerBackTitle: null,
    }),
  },
})

export default MainNavigator
