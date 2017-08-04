import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Image, Text, TouchableOpacity, Platform } from 'react-native';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import AnnouncementViewScreen from '../screens/Announcement';
import { AppStyles, AppTextStyles } from '../components/Styles';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

/*
Manages every page that exists. Essentially an index.
*/

const resetHome = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});

const resetSettings = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Settings'})
  ]
});

const RootStackNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen,
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
        height: (Platform.OS === 'ios') ? 100 : 80,
        backgroundColor: '#ffffff',
        shadowColor: '#8c8b8a',
        shadowOffset: {height:2},
        shadowOpacity: .3,
        shadowRadius: 2
      },
      headerLeft: <TouchableOpacity onPress={() => navigation.dispatch(resetHome)}>
      <Image source={require('../assets/images/logoandtext.png')} style={{left: 0, width: 310, height: 80, padding: 0, margin: 0}} />
        </TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={() => navigation.dispatch(ResetSettings)}>
      <Image source={require('../assets/images/settings.png')} style={{left: 0, marginRight: 10, width: 30, height: 30, padding: 0, margin: 0}} />
        </TouchableOpacity>
        /*<Text style={AppStyles.date}>{new Date().toDateString()}</Text>,*/
    }),
  }
);

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator />;
  }

}
