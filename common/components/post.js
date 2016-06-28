/**
* A post component
* @flow
*/

import React, { Component } from 'react';
import Time from '../utils/time.js';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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
        <View style={[
          styles.scoreContainer,
          this.state.data.type == 'job' ? {borderRightColor: 'green'} : {}
        ]}>
          <Text style={styles.score}>
            {this.state.data.score}
          </Text>
        </View>
        <View style={styles.post}>
          <View>
            <Text style={styles.title}>
              {this.state.data.title}
            </Text>
          </View>
          <View style={styles.postData}>
            {this.state.data.descendants != null
              ? (<View style={{flexDirection: 'row'}}>
                  <Text style={[styles.info, styles.comments]}>
                    {this.state.data.descendants} comments
                  </Text>
                  <Text style={styles.infoDivider}> • </Text>
                </View>)
              : null}
            {this.state.data.type == 'job'
              ? (<View style={{flexDirection: 'row'}}>
                  <Text style={styles.job}>
                    [Job]
                  </Text>
                  <Text style={styles.infoDivider}> • </Text>
                </View>)
              : null}
            <View>
              <Text style={[styles.info, styles.author]}>
                {this.state.data.by}
              </Text>
            </View>
            <View>
              <Text style={styles.info}> submitted {this.state.timeAgo}</Text>
            </View>
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
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
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
    borderRightColor: 'orange',
    borderRightWidth: 2,
  },
  score: {
    color: 'black',
    fontSize: 16
  },
  job: {
    color: 'green',
    fontSize: 10,
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
  info: {
    color: 'gray',
    fontSize: 10,
  }
});


module.exports = Post;
