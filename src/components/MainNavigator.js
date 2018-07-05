import {createStackNavigator} from 'react-navigation'

import MainScreensContainer from './chat/mainScreens/MainScreensContainer'
import Chat from './chat/singlechat/Chat'
import GChat from './chat/groupchat/GChat'
import SingleImage from './chat/singleImage/SingleImage'

const MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreensContainer,
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
      headerStyle: {
        backgroundColor: '#20AAB2',
      },
      headerTintColor: '#fff',
    }),
  },
  GChat: {
    screen: GChat,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#20AAB2',
      },
      headerTintColor: '#fff',
    }),
  },
  Image: {
    screen: SingleImage,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#20AAB2',
      },
      headerTintColor: '#fff',
    }),
  },
})

export default MainNavigator
