import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
// import OneSignal from 'react-native-onesignal';
import RootNavigation from './navigation/RootNavigation';

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };
  
  componentWillMount() {
    this._loadAssetsAsync();
    /*OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);*/
  }
  
  /*componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }*/
  
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  
  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  
  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }
  
  onIds(device) {
		console.log('Device info: ', device);
  }
  
  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }
  
  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' &&
        <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
