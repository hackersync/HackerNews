/**
* Component that renders homepage layout
* @flow
*/

import React, { Component } from 'react';
import PostList from './postlist.js';
import Header from './header.js';
import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';

export class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <StatusBar hidden={true}/>
        <PostList
          windowHeight={this.props.windowHeight}
          navigator={this.props.navigator}/>
        <Header windowWidth={this.props.windowWidth}/>
      </View>
    );
  }
}

module.exports = Homepage;
