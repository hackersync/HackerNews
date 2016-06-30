/**
 * Index file for iOS
 * @flow
 */

import React, { Component } from 'react';
import Controller from './common/components/controller.js';
import {
  AppRegistry,
  Dimensions,
  StatusBar,
  View
} from 'react-native';

class HackerSync extends Component {
  constructor() {
    super();
    let {height, width} = Dimensions.get('window');
    this.state = {
      height: height,
      width: width,
    };
  }

  render() {
    return (
      <Controller
        windowWidth = {this.state.width}
        windowHeight = {this.state.height}
      />);
  }
}

AppRegistry.registerComponent('HackerSync', () => HackerSync);
