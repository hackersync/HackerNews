/**
* The header component
*/

import React, { Component } from 'react';
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
      headers: ['top', 'new', 'comments', 'show', 'ask', 'jobs'],
      selected: 'top',
    }
  }

  _handleSelection(header) {
    console.log('switch to', header);
    this.setState({
      selected: header,
    });
  }

  _renderHeaders() {
    const headers = this.state.headers;
    let headerElements = [];
    headers.forEach(header => {
      let element = (
        <TouchableHighlight key={header} onPress={this._handleSelection.bind(this, header)}>
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
          <Text style={styles.headerText}>
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
    height: 90,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'menlo',
    alignSelf: 'center',
  },
  title: {
    height: 60,
    padding: 10,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'black',
    opacity: 0.8,
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  selected: {
    fontWeight: 'bold',
    color: 'orange',
  }
});

module.exports = Header
