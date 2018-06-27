import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

import Contacts from './Contacts'
import ChatList from './ChatList'

export default createMaterialBottomTabNavigator(
  {
    Contacts: {screen: Contacts},
    ChatList: {screen: ChatList},
  },
  {
    initialRouteName: 'ChatList',
    activeTintColor: '#F44336',
  },
)
