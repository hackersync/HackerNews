/**
* Component that
*/

import React, { Component } from 'react';
import PostList from './postlist.js';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ['top', 'new', 'best', 'show', 'ask', 'jobs'],
      selected: 'top',
    }
  }

  _handleSelection(header) {
    PostList.populateList(header);
    this.setState({
      selected: header,
    });
  }

  _renderHeaders() {
    const headers = this.state.headers;
    let headerElements = [];
    headers.forEach(header => {
      let element = (
        <TouchableHighlight
          key={header}
          onPress={this._handleSelection.bind(this, header)}>
          <Text
            style={[
              styles.carouselText,
              header === this.state.selected ? styles.selected : {}]}>
            {header}
          </Text>
        </TouchableHighlight>);
      headerElements.push(element);
    });
    return headerElements;
  }

  render() {
    return (
      <View style={[styles.header, {width: this.props.windowWidth}]}>
        <View style={[styles.title, {width: this.props.windowWidth}]}>
          <Text style={styles.titleText}>
            Hacker News
          </Text>
        </View>
        <View style={[styles.carousel, {width: this.props.windowWidth}]}>
          {this._renderHeaders()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'thonburi',
    alignSelf: 'center',
  },
  title: {
    height: 50,
    padding: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: '#937d62',
  },
  carousel: {
    height: 25,
    backgroundColor: 'black',
    opacity: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  carouselText: {
    color:'white',
    fontSize: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  selected: {
    color: 'orange',
    fontWeight: 'bold',
  }
});

module.exports = Header
