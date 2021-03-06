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

import Firebase from 'firebase';
let FirebaseUrl = new Firebase('hacker-news.firebaseio.com/v0')

let currentTime;
let itemCounter = 0;
let itemList = [];
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
    this.itemsRef = FirebaseUrl.child('item/');
  }

  static populateList(storyType) {
    console.log('story type', storyType);
  }

  async _genRows(storyType) {
    DataFetch.fetchStories(storyType).then(response => {
      this.fetchItems(response);
    });
  }

  updateList(items) {
    this.setState({
      dataSource: this.state.dsObj.cloneWithRows(items),
      loading: false,
    });
  }

  fetchItem(id, length) {
    this.itemsRef.child(id).once('value', snapshot => {
      itemCounter++;
      itemList.push(snapshot.val());
      if(itemCounter >= length){
        this.updateList(itemList);
      }
    })
  }

  fetchItems(ids) {
    var items = [];
    for(var i = 0; i < ids.length; i++){
      var id = ids[i];
      this.fetchItem(id, ids.length);
    }
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
            source={require('../assets/homepage-orange-spinner.gif')}
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
    this.props.navigator.push({
      name: 'comments',
      storyData: data,
    })
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
  list: {
    marginTop: 80,
  },
  loader: {
    alignSelf: 'center',
    marginTop: 80,
    padding: 10,
  },
  loaderImage: {
    width: 40,
    height: 40,
  },
});

module.exports = PostList;
