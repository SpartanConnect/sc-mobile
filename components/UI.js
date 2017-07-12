/*
Contains the announcment component that holds the information from the server.
*/

//IN PROGRESS: CHANGING BACKEND
import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StatusBar, TouchableOpacity, Text, View, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';


import { AppStyles, AppTextStyles } from './Styles';

/*
Core announcement component.
*/
export class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Loading Announcement",
      description: "Loading Announcement Description"
    };

    //this.retrieveContent();
  }

  componentWillReceiveProps() {
    this.retrieveContent();
  }

  _onClick() {
    Alert.alert("Hello!", "Rerouting does not work, but I can tell you that you wanted to read more about '"+this.state.title+"'.");
  }

  retrieveContent() {
    /*try {
      fetch('https://apisc.encadyma.com/announcements/'+this.props.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((responsef) => {
        return response.json();
      }).then((responseJson) => {
        this.setState((state) => {
          return {
            title: responseJson.title,
            description: "<div>"+responseJson.description+"</div>",
            shortDescription: "<div>"+responseJson.description.substring(0,40)+"...</div>",
            tags: "<div>"+responseJson.tags+"</div>"
          };
        });
      });
    } catch (error) {
      console.error(error);
    }*/
    this.setState((state) => {
      //console.log(this.props.data);
      return {
        title: (this.props.data.title || "Loading..."),
        description: ("<div>"+this.props.data.description+"</div>" || "<div>Loading Description</div>"),
        shortDescription: ("<div>"+this.props.data.description.substring(0,40)+"...</div>" || "<div>Loading...</div>"),
      };
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.returnFunction(this.props.data)} >
        <View style={AppStyles.announcement} onPress={() => this.props.returnFunction(this.props.data)}>
          <Text style={AppTextStyles.heading}>{this.state.title}</Text>
          <HTMLView value={this.state.shortDescription}/>
        </View>
      </TouchableOpacity>
    );
  }
}
