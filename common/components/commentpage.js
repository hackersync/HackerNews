/**
* Component that renders comments for a story
* along with providing link to article at the top
* @flow
*/
import React, { Component } from 'react';
import DataFetch from './datafetch.js';
import Post from './post.js';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class CommentPage extends Component {
  constructor(props) {
    super(props);
    console.log('comments for story:', this.props.storyData);
  }

  render() {
    return (
      <View style={styles.storyDescription}>
        <Text>{this.props.storyData.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  storyDescription: {
    marginTop: 40,
    alignItems: 'center'
  }
});

module.exports = CommentPage;
