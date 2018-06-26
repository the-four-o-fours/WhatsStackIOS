import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Main from './src/components/Main';

export default (RootNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: ({ navigation }) => ({
        title: 'WhatsStack',
      }),
    },
  },
  {
    initialRouteName: 'Main',
  }
));
