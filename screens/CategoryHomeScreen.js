import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StyleSheet, StatusBar, Text, View, WebView, TouchableHighlight, I18nManager, Switch, TextInput, DrawerLayoutAndroid, DrawerConsts} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from '../components/Styles';
import { Announcement } from '../components/UI';

class CategoryHomeScreen extends React.Component{
  render(){
  return(
    <Text>Categories!</Text>
    );
  }
}

export default class ExportCategoryHomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Categories',
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.returnFunction(this.props.id)} >
        <View>
          <Text style={AppTextStyles.heading}>{this.state.categories}</Text>
        </View>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <CategoryHomeScreen categories='ASB'/>
        <CategoryHomeScreen categories='Clubs'/>
        <CategoryHomeScreen categories='Academics'/>
        <CategoryHomeScreen categories='Sports' />
        <CategoryHomeScreen categories='Counseling' />
        <CategoryHomeScreen categories='PTSA' />
      </View>
    )
  }
}

constructor(props) {
    super(props);
    this.state = {
      categories: [],
      refreshing: true
    };
  }
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
