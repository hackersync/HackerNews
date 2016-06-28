/**
* Component that renders homepage layout
* @flow
*/

import React, { Component } from 'react';
import PostList from './postlist.js';
import Header from './header.js';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

export class Homepage extends Component {
  constructor(props) {
    super(props);
    let {height, width} = Dimensions.get('window');
    this.state = {
      height: height,
      width: width,
    }
  }

  render() {
    return (
      <View>
        <PostList
          windowHeight={this.state.height}
          navigator={this.props.navigator}/>
        <Header windowWidth={this.state.width}/>
      </View>
    );
  }
}

module.exports = Homepage;
