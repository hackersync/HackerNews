/**
* The header component
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.windowWidth,
    }
  }

  render() {
    return (
      <View style={[styles.header, {width: this.state.width}]}>
        <View style={[styles.title, {width: this.state.width}]}>
          <Text style={styles.headerText}>
            Hacker News
          </Text>
        </View>
        <View style={[styles.carousel, {width: this.state.width}]}>
          <Text style={[styles.carouselText, styles.selected]}>
            top
          </Text>
          <Text style={styles.carouselText}>
            new
          </Text>
          <Text style={styles.carouselText}>
            threads
          </Text>
          <Text style={styles.carouselText}>
            comments
          </Text>
          <Text style={styles.carouselText}>
            show
          </Text>
          <Text style={styles.carouselText}>
            ask
          </Text>
          <Text style={styles.carouselText}>
            jobs
          </Text>
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
