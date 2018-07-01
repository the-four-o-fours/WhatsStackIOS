import {createStackNavigator} from 'react-navigation'

import AllChats from './chat/mainScreens/AllChatsContainer'
import Chat from './chat/singlechat/Chat'
import NewChat from './chat/singlechat/NewChat'

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
      title: navigation.state.params.title,
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
})

export default MainNavigator
