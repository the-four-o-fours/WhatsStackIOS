import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/AllChats'

const MainNavigator = createStackNavigator({
  Main: {
    screen: AllChats,
    navigationOptions: ({navigation}) => ({
      title: 'WhatsStack',
    }),
  },
  Chat: {
    screen: AllChats,
    navigationOptions: ({navigation}) => ({
      headerLeft: '<-',
    }),
  },
})

export default MainNavigator
