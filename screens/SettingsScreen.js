import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import { AppStyles, AppTextStyles } from '../components/Styles';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        {/* Go ahead and delete ExpoConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */}
        <Text style={AppStyles.pageTitle}>Settings</Text>
        <ExpoConfigView />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
