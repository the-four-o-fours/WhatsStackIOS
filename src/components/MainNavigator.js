import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats'
import Chat from './chat/Chat'

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
})

export default MainNavigator
