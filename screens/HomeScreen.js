/*
HomeScreen is the main page of the app where users can view the announcements.
This file contains the actual screen component used to display the announcement.

*/

import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, FlatList, RefreshControl, ScrollView, StyleSheet, StatusBar, Text, View, WebView, TouchableHighlight, I18nManager, Switch, TextInput, DrawerLayoutAndroid, DrawerConsts} from 'react-native';
import HTMLView from 'react-native-htmlview';

//import Swiper from 'react-native-swiper';
import { AppStyles, AppTextStyles } from '../components/Styles';
import { Announcement } from '../components/UI';
import { API_CALL } from '../constants/APICalls';

/*
The screen that holds the announcements.
*/
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    /*text goes here if you need it*/
  };

  constructor(props) {
    super(props);
    this.state = {
      // the announcements array holds all the announcement object.
      announcements: [],
      refreshing: true,
      categoryAnnouncements: {
        asb: [],
        academics: [],
        general: [],
        counseling: [],
        clubs: [],
        sports: [],
        urgent: []
      },
      categories: [],
      settings: null
    };
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
    });

    // Refreshes when app starts.
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
      this.forceUpdate();
    });
    this.SettingsRefresh();
  }

  async SettingsRefresh()
  {
      try {
        let temp = await AsyncStorage.getItem('@GradeLevel');
        if(temp != null)
        {
          this.setState({settings: temp});
        }
        else
        {
          await AsyncStorage.setItem('@GradeLevel', 'all');
          this.setState({settings: 'all'});
        }
      } catch (error) {
        await AsyncStorage.setItem('@GradeLevel', 'all');
        this.setState({settings: 'all'});
      }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
      this.forceUpdate();
    });
  }

  _onRedirect(announcementData) {
    const { navigate } = this.props.navigation;
    navigate('Announcement', {data: announcementData});
  }

  retrieveCurrentAnnouncements(resolve, reject) {
    try {
      // retrieves categories
      let categories = fetch(API_CALL+'tags/?parentId=0&visibility=1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((categoriesJson) => {
        this.setState((state) => {
          return {
            categories: categoriesJson.map((category) => {
              return {key: category.id, value: category}
            })
          };
        });
        resolve(categoriesJson);
        return categoriesJson;
      });

      let currents = fetch(API_CALL+'announcements/current', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        // Getting a massive list of announcements -- but not filtered!
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
        resolve(responseJson);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });


      // Waits for categories and announcements to be retrieved
      Promise.all([categories, currents]).then((aggregateData) => {
        //console.log(aggregateData[1]);
        let filteredAnnouncements = {};
        // fetch assoc
        aggregateData[0].map((category) => {
          filteredAnnouncements[category.slug] = [];
        });

        // loop through each announcement
        // and fill up filteredAnnouncements
        aggregateData[1].map((announcement) => {
          // Map through each announcement
          // It's not guaranteed that each announcement will have
          // only one category, so this is done.
          announcement.tags.map((tag) => {
            if (tag.parentId === null && tag.visibility == 1) {
              // push the announcement in the appropriate category
              filteredAnnouncements[tag.slug].push({key: announcement.id, value: announcement});
            } else {
              // this is the code that runs when it isn't a category.
              // It's blank.
            }
          });
        });

        return filteredAnnouncements;
        /*this.setState((state) => {
          return {
            categoryAnnouncements: filteredAnnouncements
          };
        });*/
      }).then((data) => {
        this.setState((state) => {
          return {
            categoryAnnouncements: data
          };
        })
        resolve(true);
      });

    } catch (error) {
      resolve(false);
      console.error(error);
    }
  }
  conditionalRender(condition, content) {
   if (condition) {
       return content;
   } else {
       return null;
   }
 }

  render() {

     const { navigate } = this.props.navigation;

     // Loads in a list of all the announcements.
    return (

      <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>} style={AppStyles.announcementsView}>
           <StatusBar/>

             {this.conditionalRender(this.state.categoryAnnouncements.urgent.length!=0 && (this.state.settings == 'all' || this.state.categoryAnnouncements.urgent.map( announcement => {
               value = announcement.value.tags.map((tag) => {
                 return tag.slug;
               });
               console.log(value);
               return value.includes(this.state.settings);
             }).includes(true)),
             <View>
               <Text style= {AppStyles.urgent}>Urgent</Text>
               <FlatList data={this.state.categoryAnnouncements.urgent} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
             </View>)}


           {this.conditionalRender(this.state.categoryAnnouncements.general.length!=0 && (this.state.settings == 'all' || this.state.categoryAnnouncements.general.map( announcement => {
             value = announcement.value.tags.map((tag) => {
               return tag.slug;
             });
             console.log(value);
             return value.includes(this.state.settings);
           }).includes(true)),
             <View>
             <Text style= {AppStyles.general}>General</Text>
             <FlatList data={this.state.categoryAnnouncements.general} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
             </View>)
           }

           {this.conditionalRender(this.state.categoryAnnouncements.asb.length!=0  && (this.state.settings == 'all' || this.state.categoryAnnouncements.asb.map( announcement => {
             value = announcement.value.tags.map((tag) => {
               return tag.slug;
             });
             console.log(value);
             return value.includes(this.state.settings);
           })),
             <View>
               <Text style= {AppStyles.asb}>ASB</Text>
               <FlatList data={this.state.categoryAnnouncements.asb} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
             </View>)}

           {this.conditionalRender(this.state.categoryAnnouncements.academics.length!=0  && (this.state.settings == 'all' || this.state.categoryAnnouncements.academics.map( announcement => {
             value = announcement.value.tags.map((tag) => {
               return tag.slug;
             });
             console.log(value);
             return value.includes(this.state.settings);
           }).includes(true)),
             <View>
              <Text style= {AppStyles.academics}>Academics</Text>
              <FlatList data={this.state.categoryAnnouncements.academics} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
            </View>)}

           {this.conditionalRender(this.state.categoryAnnouncements.clubs.length!=0  && (this.state.settings == 'all' || this.state.categoryAnnouncements.clubs.map( announcement => {
             value = announcement.value.tags.map((tag) => {
               return tag.slug;
             });
             console.log(value);
             return value.includes(this.state.settings);
           }).includes(true)),
             <View>
              <Text style= {AppStyles.clubs}>Clubs</Text>
              <FlatList data={this.state.categoryAnnouncements.clubs} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
            </View>)}

           {this.conditionalRender(this.state.categoryAnnouncements.sports.length!=0  && (this.state.settings == 'all' || this.state.categoryAnnouncements.sports.map( announcement => {
             value = announcement.value.tags.map((tag) => {
               return tag.slug;
             });
             console.log(value);
             return value.includes(this.state.settings);
           }).includes(true)),
             <View>
              <Text style= {AppStyles.sports}>Sports</Text>
              <FlatList data={this.state.categoryAnnouncements.sports} renderItem={({item}) => <Announcement settings={this.state.settings} id={item.value.id} data={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
              </View>)}

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
