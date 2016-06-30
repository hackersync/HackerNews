/**
* Component that controls navigation throughout app
* @flow
*/
import React, { Component } from 'react';
import Homepage from './homepage.js';
import CommentPage from './commentpage.js';
import {
  Navigator,
  StyleSheet,
} from 'react-native';

export class Controller extends Component {
  constructor(props){
    super(props);
  }

  _renderNavScene(route, navigator) {
    switch (route.name) {
      case 'home':
        return (<Homepage
          navigator={navigator}
          {...this.props}/>);
      case 'comments':
        return (<CommentPage
          navigator={navigator}
          storyData={route.storyData}
          {...this.props}/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this._renderNavScene.bind(this)}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump}
        sceneStyle={styles.page}/>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffebcb',
  }
})

module.exports = Controller;
