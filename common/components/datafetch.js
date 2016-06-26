/**
 * Handles data fetching from Hacker News API
 * @flow
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const TOP_STORIES = 'topstories';
const ITEM = 'item/'
const JSON_EXTENSION = '.json';
const NUM_STORIES = 30;

export class DataFetch {
  static async fetchTopStories() {
    try {
      const data = await fetch(BASE_URL + TOP_STORIES + JSON_EXTENSION);
      const topStoryIDs = await data.json();
      let topStories = [];
      for (let i = 0; i < NUM_STORIES; i++){
        const id = topStoryIDs[i];
        const item = this.fetchItem(id);
        topStories.push(item);
      }
      return topStories;
    }
    catch(error) {
      console.error(error);
    }
  }

  static async fetchItem(id) {
    try {
      let response = await fetch(BASE_URL + ITEM + id + JSON_EXTENSION);
      let item = await response.json();
      return item;
    }
    catch(error) {
      console.error(error);
    }
  }
}

module.exports = DataFetch;
