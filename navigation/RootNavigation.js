import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Image, Text, TouchableOpacity } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import AnnouncementViewScreen from '../screens/Announcement';
import { AppStyles, AppTextStyles } from '../components/Styles';
import HomeScreen from '../screens/HomeScreen';

/*
Manages every page that exists. Essentially an index.
*/

const RootStackNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
    Announcement: {
      screen: AnnouncementViewScreen
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        fontSize: 22
      },
      headerStyle: {
        height: 100,
        backgroundColor: '#ffffff',
        shadowColor: '#8c8b8a',
        shadowOffset: {height:2},
        shadowOpacity: .3,
        shadowRadius: 2
      },
      headerLeft: <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image source={require('../assets/images/logoandtext.png')} style={{left: 0, width: 310, height: 80, padding: 0, margin: 0}} />
        </TouchableOpacity>,
      headerRight: <Text style={AppStyles.date}>{new Date().toDateString()}</Text>,
    }),
  }
);

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator />;
  }

}
