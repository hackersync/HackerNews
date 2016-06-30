/**
* Component that controls the header of all pages besides the homepage.
* Allows for navigation between scenes.
* @flow
*/

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  _navBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <TouchableHighlight
        key={'toolbar-back-button'}
        style={styles.backButton}
        onPress={this._navBack.bind(this)}
        underlayColor='#937d62'>
        <View style={styles.wrapper}>
          <Image
            source={require('../assets/back-arrow.png')}
            style={styles.back}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  back: {
    width: 30,
    height: 30,
    flex: 1,
  },
});

module.exports = BackButton;
