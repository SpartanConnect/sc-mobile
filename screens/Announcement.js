import React, { Component } from 'react';
import { Alert, Button, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, WebView, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from '../components/Styles';

export default class AnnouncementView extends React.Component {
  static navigationOptions = {
    title: 'Announcement',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "Loading Announcement",
      description: "Loading Announcement Description"
    };

    this.retrieveContent();
  }

  componentWillReceiveProps() {
    this.retrieveContent();
  }

  retrieveContent() {
    //console.log(this.props)
    /*try {
      console.log(this.props);
      fetch('https://apisc.encadyma.com/announcements/'+this.props.id, {
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
            title: responseJson.title,
            description: "<div>"+responseJson.description+"</div>"
          };
        });
      });
    } catch (error) {
      console.error(error);
    }*/

    // TODO: Get rid of state
    return {
      title: this.props.navigation.state.params.data.title,
      description: "<div>"+this.props.navigation.state.params.data.description+"</div>"
    }
  }

  render() {
    return (
      <View style={AppStyles.announcement}>
        <Text style={AppTextStyles.heading}>{this.props.navigation.state.params.data.title}</Text>
        <HTMLView value={this.props.navigation.state.params.data.description}/>
        <Text>Posted by {this.props.navigation.state.params.data.creator.name}</Text>
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
    return (<WebView source={{uri: 'https://apisc.encadyma.com/announcements/current'+params.data.id}}/>);
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
        <AnnouncementView data={this.props.navigation.state.params.data}/>
        <Button title="View In Web App" onPress={() => {navigate('AnnouncementWeb', {id: params.data.id})}} />
      </ScrollView>
    );
  }
}

