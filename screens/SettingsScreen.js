import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, AsyncStorage, View, Switch, Alert, Dimensions } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import { AppStyles, AppTextStyles } from '../components/Styles';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class SettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
    });

    constructor(props) {
        super(props);
        this.state = {
            pickerValue: null,
            switcher: null,
        };
        this.getValue();
    }

    render() {
        return (
            <ScrollView style={ styles.container }>
                <Text style={ AppStyles.settings }>Select a Grade to Filter By</Text>
                <View style={ AppStyles.settingsView }>
                    <Picker selectedValue={ this.state.pickerValue } onValueChange={(itemValue, itemIndex) => this.valueChange(itemValue)}>
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="7th" value="grade7" />
                        <Picker.Item label="8th" value="grade8" />
                        <Picker.Item label="9th" value="grade9" />
                        <Picker.Item label="10th" value="grade10" />
                        <Picker.Item label="11th" value="grade11" />
                        <Picker.Item label="12th" value="grade12" />
                    </Picker>
                </View>
                <View>
                <Text style={ AppStyles.settings}>Enable Push Notifications {this.state.switcher}</Text>
                <Switch style={{marginLeft: Dimensions.get('window').width/2 - 28, marginRight: Dimensions.get('window').width/2 - 18, paddingBottom: 0, transform: [{scaleX: 1.1}, {scaleY: 1.1}]}} onTintColor="red" thumbTintColor="gainsboro" onValueChange={(itemValue, itemIndex) => this.switchChange(itemValue)} value={this.state.switcher}/>
                </View>
            </ScrollView>
        );
    }

    async switchVal(itemValue) {
        await AsyncStorage.setItem('@pushNotif', itemValue.toString());
        this.setState({switcher: itemValue});
        registerForPushNotificationsAsync();
    }

    async switchChange(itemValue, itemIndex){
      try {
          if (!itemValue) {
            Alert.alert(
              'Push Notifications',
              'Are you sure you would like to disable push notifications? You will not be able to stay up to date with the latest LCHS events.',
              [
                {text: 'No', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => {this.switchVal(itemValue)}}
              ],
              { cancelable: false}
            )
          } else {
            this.switchVal(itemValue);
          }
      } catch(error) {
          console.log('error', error);
      }
    }

    async valueChange(itemValue, itemIndex){
      try {
          await AsyncStorage.setItem('@GradeLevel', itemValue);
          this.setState({pickerValue: itemValue});
      } catch(error) {
          console.log('error', error);
      }
    }

    async getValue() {
        try {
            let currentSwitcherValue = (await AsyncStorage.getItem('@pushNotif') == "true");
            this.setState({switcher: currentSwitcherValue});
            let currentGradeValue = await AsyncStorage.getItem('@GradeLevel');
            this.setState({pickerValue: currentGradeValue});
        } catch(error) {
            console.log('error', error);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
