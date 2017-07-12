
import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StyleSheet, StatusBar, Text, View, WebView, TouchableHighlight, I18nManager, Switch, TextInput, DrawerLayoutAndroid, DrawerConsts} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from '../components/Styles';


export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      refreshing: true
    };
  }

  retrieveCategories(resolve, reject) {
    //http://sctest.x10.mx/api/get_current_announcements.php?returnType=ids
    try {
      fetch('https://apisc.encadyma.com/tags/?visibility=1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        var index = 0;
        var keyArray = responseJson.map(function categories(obj)
      {
        var rObj = {};
        rObj[obj.id] = obj.name;
        return rObj;
      });
        this.setState((state) => {
          return {
            categories: keyArray
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
              <FlatList data={this.state.categories} renderItem={({item}) => <Announcement id={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
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
