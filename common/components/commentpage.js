/**
* Component that renders comments for a story
* along with providing link to article at the top
* @flow
*/
import React, { Component } from 'react';
import DataFetch from './datafetch.js';
import BackButton from './backbutton.js';
import Post from './post.js';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class CommentPage extends Component {
  constructor(props) {
    super(props);
    console.log('page for the story:', this.props.storyData);
    this.state = {
      loading: true,
      commentsFetched: 0,
      comments: [],
    }
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

  _fetchComments(commentIds) {
    let kids = [];
    let counter = 0;
    commentIds.forEach(kid => {
      DataFetch.fetchItem(kid).then(response => {
        counter++;
        let comments = this.state.comments;
        if (response.deleted == undefined) {
          console.log(response);
          comments.push(response);
        }
        this.setState({
          comments: comments,
        });

        if(response.kids) {
          kids = kids.concat(response.kids);
        }

        if(counter >= commentIds.length && kids.length > 0){
          this._fetchComments(kids);
        } else if (counter >= commentIds.length && kids.length == 0){
          console.log('done!');
          if (comments.length == this.props.storyData.descendants) {
            console.log('comments length and descendants match');
            console.log(comments, this.props.storyData);
          }
        }
      });
    });
  }

  componentDidMount() {
    let kids = this.props.storyData.kids;
    this._fetchComments(kids);
  }

  render() {
    return (
      <View style={styles.story}>
        <BackButton {...this.props}/>
        <View style={styles.storyDescription}>
          <Text style={styles.storyTitle}>
            {this.props.storyData.title}
          </Text>
          <View style={styles.subtext}>
            <Text style={styles.storyInfo}>{this.props.storyData.score} points • </Text>
            <Text style={[styles.storyInfo, styles.author]}>{this.props.storyData.by}</Text>
            <Text style={styles.storyInfo}> • {this.props.storyData.descendants} comments</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  story: {
    flexDirection: 'row',
    backgroundColor: '#545454',
    borderBottomWidth: 3,
    borderBottomColor: '#937d62',
  },
  storyDescription: {
    marginTop: 0,
    alignItems: 'flex-start',
    padding: 20,
    flex: 1,
  },
  storyTitle: {
    fontSize: 18,
    color: 'white',
  },
  subtext: {
    flexDirection: 'row',
    marginTop: 5,
  },
  storyInfo: {
    color: 'lightgray',
    fontSize: 12,
  },
  author: {
    color: 'orange',
    fontSize: 12,
  },
  loader: {

  },
  loaderImage: {

  },
});

module.exports = CommentPage;
