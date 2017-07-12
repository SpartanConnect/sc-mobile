import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Image, Text } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import AnnouncementViewScreen from '../screens/Announcement';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Announcement: {
      screen: AnnouncementViewScreen
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        fontSize: 22
      },
      headerStyle: {
        height: 80,
        backgroundColor: '#ffffff'
      },
      headerLeft: <Image source={require ('../assets/images/logoandtext.png')}
        style={{left: 0, width: 310, height: 80, padding: 0, margin: 0}} />,
      headerRight: <Text style={{marginTop: 60, marginRight: 4, color:"#FFC91E"}}>{new Date().toDateString()}</Text>,
    }),
  }
);

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator />;
  }

}
