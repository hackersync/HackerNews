/**
* A post component
* @flow
*/

import React, { Component } from 'react';
import Time from '../utils/time.js';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class Post extends Component {
  constructor(props){
    super(props);
    let rowData = this.props.data;
    let currentTime = this.props.currentTime;
    let timeAgo = Time.getTimeAgo(currentTime, rowData.time*1000);

    this.state = {
      data: rowData,
      timeAgo: timeAgo,
    }
  }

  render() {
    return (
      <View style={styles.listItem}>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>
            {this.state.data.score}
          </Text>
        </View>
        <View style={styles.post}>
          <Text style={styles.title}>
            {this.state.data.title}
          </Text>
          <View style={styles.postData}>
            <Text style={[styles.postInfoItem, styles.comments]}>
              {this.state.data.descendants} comments
            </Text>
            <Text style={styles.infoDivider}> • </Text>
            <Text style={styles.postInfoItem}>submitted by </Text>
            <Text style={[styles.postInfoItem, styles.author]}>
              {this.state.data.by}
            </Text>
            <Text style={styles.postInfoItem}> {this.state.timeAgo}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  infoDivider: {
    color: 'gray',
    fontSize: 10,
  },
  post: {
    flex: 1,
  },
  scoreContainer: {
    flex: 0,
    width: 50,
    paddingRight: 8,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRightColor: 'white',
    borderRightWidth: 2,
  },
  score: {
    fontWeight: 'bold',
    color: 'gray',
  },
  title: {
    fontSize: 12,
  },
  postData: {
    flexDirection: 'row',
  },
  comments: {
    fontWeight: 'bold',
  },
  author: {
    color: '#cc8400',
  },
  postInfoItem: {
    color: 'gray',
    fontSize: 10,
  }
});


module.exports = Post;
