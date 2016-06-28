/**
 * Index file for iOS
 * @flow
 */

import React, { Component } from 'react';
import Controller from './common/components/controller.js';
import { AppRegistry } from 'react-native';

class HackerSync extends Component {
  constructor() {
    super();
  }

  render() {
    return <Controller/>;
  }
}

AppRegistry.registerComponent('HackerSync', () => HackerSync);
