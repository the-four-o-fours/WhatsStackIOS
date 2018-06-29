import {createStackNavigator} from 'react-navigation'

import AllChatsList from '../components/chat/SectionList/AllChatsList'

const MainNavigator = createStackNavigator({
  Main: {
    screen: AllChatsList,
    navigationOptions: ({navigation}) => ({
      title: 'WhatsStack',
    }),
  },
})

export default MainNavigator
