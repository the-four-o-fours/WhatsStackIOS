import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats'
import Chat from './chat/Chat'

const MainNavigator = createStackNavigator({
  Main: {
    screen: AllChats,
    navigationOptions: ({navigation}) => ({
      title: 'WhatsStack',
    }),
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => ({
      headerLeft: '<-',
    }),
  },
})

export default MainNavigator
