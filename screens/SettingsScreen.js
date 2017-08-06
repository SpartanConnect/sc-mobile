import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, AsyncStorage, View } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import { AppStyles, AppTextStyles } from '../components/Styles';

export default class SettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
    });

    constructor(props) {
        super(props);
        this.state = {
            pickerValue: null
        };
        this.getValue();
    }

    render() {
        return (
            <ScrollView style={ styles.container }>
                <Text style={ AppStyles.settings }>Select a grade to filter by.</Text>
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
                <Text style={ AppStyles.helperText }>(We are working on allowing you to select multiple grades!)</Text>
            </ScrollView>
        );
    }

    async valueChange(itemValue, itemIndex){
        try {
            await AsyncStorage.setItem('@GradeLevel', itemValue);
            let currentValue = await AsyncStorage.getItem('@GradeLevel');
            this.setState({pickerValue: currentValue});
        } catch(error) {
            console.log('error', error);
        }
    }

    async getValue() {
        try {
            let currentValue = await AsyncStorage.getItem('@GradeLevel');
            this.setState({pickerValue: currentValue});
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
