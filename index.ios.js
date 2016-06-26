/**
 * Index file for iOS
 * @flow
 */

import React, { Component } from 'react';
import Homepage from './common/components/homepage.js';
import { AppRegistry } from 'react-native';

class HackerSync extends Component {
  constructor() {
    super();
  }

  render() {
    return <Homepage/>;
  }
}

AppRegistry.registerComponent('HackerSync', () => HackerSync);
