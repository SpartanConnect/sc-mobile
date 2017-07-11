import React, { Component } from 'react';
import { Alert, Button, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from '../components/Styles';

export default class AnnouncementView extends React.Component {
  static navigationOptions = {
    title: 'Announcements',
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "Loading Announcement",
      description: "Loading Announcement Description"
    };

    this.retrieveContent();
  }

  componentWillReceiveProps() {
    this.retrieveContent();
  }

  retrieveContent() {
    try {
      fetch('http://sctest.x10.mx/api/get_announcement_by_id.php?announcement_id='+this.props.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        this.setState((state) => {
          return {
            name: responseJson.name,
            description: "<div>"+responseJson.description+"</div>"
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={AppStyles.announcement}>
        <Text style={AppTextStyles.heading}>{this.state.name}</Text>
        <HTMLView value={this.state.description}/>
        <Text>Posted by Sir Issac the Waltson</Text>
      </View>
    );
  }
}

// Web Screen for Announcement
export class AnnouncementWebScreen extends React.Component {
  static navigationOptions = {
    title: 'Spartan Connect Web App'
  };

  render() {
    const { params } = this.props.navigation.state;
    return (<WebView source={{uri: 'http://sctest.x10.mx/view.php?id='+params.id}}/>);
  }
}

// The Announcment Screen
export class AnnouncementViewScreen extends React.Component {
  static navigationOptions = {
    title: 'View Announcement'
  };

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return(
      <ScrollView style={AppStyles.announcementsView}>
        <StatusBar hidden />
        <AnnouncementView id={params.id}/>
        <Button title="View In Web App" onPress={() => {navigate('AnnouncementWeb', {id: params.id})}} />
      </ScrollView>
    );
  }
}
