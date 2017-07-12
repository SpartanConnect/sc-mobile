/*
HomeScreen is the main page of the app where users can view the announcements.
This file contains the actual screen component used to display the announcements

*/

import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StyleSheet, StatusBar, Text, View, WebView, TouchableHighlight, I18nManager, Switch, TextInput, DrawerLayoutAndroid, DrawerConsts} from 'react-native';
import HTMLView from 'react-native-htmlview';
//import Swiper from 'react-native-swiper';
import { AppStyles, AppTextStyles } from '../components/Styles';
import { Announcement } from '../components/UI';



/*
The screen that holds the announcements.
*/
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Announcements',
  };

  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      refreshing: true
    };
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
      this.forceUpdate();
    });
  }

  _onRedirect(announcementId) {
    const { navigate } = this.props.navigation;
    navigate('Announcement', {id: announcementId});
  }

  retrieveCurrentAnnouncements(resolve, reject) {
    //http://sctest.x10.mx/api/get_current_announcements.php?returnType=ids
    try {
      fetch('http://sctest.x10.mx/api/get_current_announcements.php?returnType=ids', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        var index = 0;
        var keyArray = responseJson.map((result) => {
          index = index + 1;
          return {key: index, value: result};
        });
        this.setState((state) => {
          return {
            announcements: keyArray
          };
        });
      }).then(() => {
        resolve(true);
      });
    } catch (error) {
      resolve(false);
      console.error(error);
    }
  }


  render() {

     const { navigate } = this.props.navigation;

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>} style={AppStyles.announcementsView}>
              <StatusBar hidden />
              <FlatList data={this.state.announcements} renderItem={({item}) => <Announcement id={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
        </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 80,
  },

});
