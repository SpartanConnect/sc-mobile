import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Image, Text, TouchableOpacity, Platform } from 'react-native';

import { AppStyles, AppTextStyles } from '../components/Styles';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AnnouncementViewScreen from '../screens/Announcement';

const RootStackNavigator = StackNavigator({
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
            fontSize: 22,
            color: '#a6192e'
        },
        headerStyle: {
            height: (Platform.OS === 'ios') ? 100 : 80,
            backgroundColor: '#ffffff',
            shadowColor: '#8c8b8a',
            shadowOffset: {height:2},
            shadowOpacity: .3,
            shadowRadius: 2
        },
        headerTintColor: '#a6192e'
    }),
});

function getCurrentRouteName(navigationState) {
    if(!navigationState) { return null; }

    const route = navigationState.routes[navigationState.index];
    if(route.routes) {
        return getCurrentRouteName(route);
    }
    return route;
}

export default class RootNavigator extends React.Component {
    render() {
        return <RootStackNavigator onNavigationStateChange={(previousState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            if(currentScreen.routeName == "Home") {

            }
        }}
        />
    }
}
