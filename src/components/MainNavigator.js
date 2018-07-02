import {createStackNavigator} from 'react-navigation'

import MainScreensContainer from './chat/mainScreens/MainScreensContainer'
import Chat from './chat/singlechat/Chat'
import NewChat from './chat/singlechat/NewChat'

const MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreensContainer,
    navigationOptions: ({navigation}) => ({title: 'WhatsStack', headerBackTitle: null})
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => ({title: navigation.state.params.title, headerBackTitle: null})
  },
  NewChat: {
    screen: NewChat,
    navigationOptions: ({navigation}) => ({title: 'New Message', headerBackTitle: null})
  }
})

export default MainNavigator
