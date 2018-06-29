import {createMaterialTopTabNavigator} from 'react-navigation'

import Main from '../Main'
import Login from '../auth/Login'
import CreateUser from '../auth/CreateUser'

export default TopNav = createMaterialTopTabNavigator({
  Menu: {
    screen: Login
  },
  NewChat: {
    screen: CreateUser
  }

}, {
  order: ['Menu', 'NewChat'],
  animationEnabled: true
})