/**
* Component that renders list of top Hacker News posts
* @flow
*/
import React, { Component } from 'react';
import DataFetch from './datafetch.js';
import Post from './post.js';
import {
  Image,
  ListView,
  StyleSheet,
  View
} from 'react-native';

let currentTime;
export class PostList extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log('props', this.props);
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      dsObj: dataSource,
      height: this.props.windowHeight,
      loading: true,
    };
  }

  async _genRows() {
    let counter = 0;
    let interval = setInterval(() => {
      counter++;
    }, 1);
    DataFetch.fetchTopStories()
      .then(response => {
        let allItems = Promise.all(response);
        allItems.then(stories => {
          console.log(stories);
          console.log('retrieval time:', counter);
          clearInterval(interval);

          this.setState({
            dataSource: this.state.dsObj.cloneWithRows(stories),
            loading: false,
          });
        });
      });
  }

  componentDidMount() {
    console.log('what is the state', this.state);
    currentTime = Date.now();
    this._genRows();
  }

  _renderSpinner() {
    if(this.state.loading) {
      return (
        <View style={styles.loader}>
          <Image
            source={require('../assets/orange-spinner.gif')}
            style={styles.loaderImage}
          />
        </View>
      );
    }
    else {
      return null;
    }
  }

  _renderRow(rowData, sectionID, rowID){
    return (
      <Post
        data={rowData}
        currentTime={currentTime}
      />
    )
  }

  render() {
    return (
      <View style={styles.page}>
        {this._renderSpinner()}
        <View style={{height: this.state.height}}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            initialListSize={30}
            pageSize={30}
            enableEmptySections={ true }
            renderRow={this._renderRow}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffebcb',
  },
  list: {
    marginTop: 90,
  },
  loader: {
    alignSelf: 'center',
    marginTop: 90,
    padding: 10,
  },
  loaderImage: {
    width: 40,
    height: 40,
  },
});

module.exports = PostList;
