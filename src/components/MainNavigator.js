import {createStackNavigator} from 'react-navigation'

import MainScreensContainer from './chat/mainScreens/MainScreensContainer'
import Chat from './chat/chatScreen/Chat'
import ImageView from './chat/chatScreen/ImageView'

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
  ImageView: {
    screen: ImageView,
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
