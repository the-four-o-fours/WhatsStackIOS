import {createStackNavigator} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TopNavigation, {
  IconTab,
  Badge,
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import AllChatsList from '../components/chat/SectionList/AllChatsList'
import NewChat from './chat/NewChat'

const MainNavigator = createStackNavigator(
  {
    Chats: AllChatsList,
    New: NewChat,
  },
  {
   order: ['Chats', 'New'],
   animationEnabled: true,
   style: {
    backgroundColor: 'green'
  }
  }
)

export default MainNavigator
