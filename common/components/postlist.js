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
  TouchableHighlight,
  View,
} from 'react-native';

let currentTime;
export class PostList extends Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      dsObj: dataSource,
      height: this.props.windowHeight,
      loading: true,
    };

    this._renderRow = this._renderRow.bind(this);
  }

  static populateList(storyType) {
    console.log('story type', storyType);
  }

  async _genRows(storyType) {
    let counter = 0;
    let interval = setInterval(() => {
      counter++;
    }, 1);
    DataFetch.fetchStories(storyType)
      .then(response => {
        let allItems = Promise.all(response);
        allItems.then(stories => {
          // console.log(stories);
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
    currentTime = Date.now();
    this._genRows('top');
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

  _handleSelection(data) {
    console.log('data', data);
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return (
      <TouchableHighlight
        onPress={() => {
          this._handleSelection(rowData);
          highlightRow(sectionID, rowID);
        }}
        underlayColor='#fff3df'>
        <View>
          <Post data={rowData} currentTime={currentTime}/>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#e5d3b6',
        }}
      />
    );
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
            renderSeparator={this._renderSeparator}
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
