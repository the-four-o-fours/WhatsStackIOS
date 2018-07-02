import {createStackNavigator} from 'react-navigation'

import MainScreensContainer from './chat/mainScreens/MainScreensContainer'
import Chat from './chat/singlechat/Chat'

const MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreensContainer,
    navigationOptions: ({navigation}) => ({title: 'WhatsStack', headerBackTitle: null})
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => ({title: navigation.state.params.title, headerBackTitle: null})
  }
})

export default MainNavigator
