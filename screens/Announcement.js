import React, { Component } from 'react';
import { Alert, Button, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, WebView, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from '../components/Styles';

export default class AnnouncementView extends React.Component {
  static navigationOptions = {

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

    // TODO: Get rid of state
    return {
      title: this.props.navigation.state.params.data.title,
      description: "<div>"+this.props.navigation.state.params.data.description+"</div>",
      tags: this.props.navigation.state.params.data.tags.id,
    }
  }

  render() {
    return (
      <View style={AppStyles.announcement}>
        <ScrollView>
        <Text style={AppTextStyles.heading}>{this.props.navigation.state.params.data.title}</Text>
        <Text style={AppStyles.announcementDescription}>Posted by {this.props.navigation.state.params.data.creator.name}</Text>
        <Text style={AppStyles.announcementCoreText}>{this.props.navigation.state.params.data.description}</Text>
        <Text style={AppStyles.announcementDescription}>{this.props.navigation.state.params.data.tags.map(tag => {return tag.name + " ";})}</Text>
        </ScrollView>
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

/*
The screen that loads in when the announcement is clicked on homescreen.
*/
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
