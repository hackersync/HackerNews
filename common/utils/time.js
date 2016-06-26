/**
* Util that returns how long ago a post was made,
* in English (i.e. 'just now', '5 mins ago', '9 hrs ago', etc.)
*/

export class Time {
  static getTimeAgo(currentTime, timePosted) {
    let timeAgo = currentTime - timePosted;
    // seconds
    timeAgo = Math.floor(timeAgo/1000);
    // console.log(timeAgo, 'seconds');
    if(timeAgo < 60){
      timeAgo = 'just now';
    } else if(timeAgo >= 60 && timeAgo < 120) {
      timeAgo = '1 min ago';
    } else {
      timeAgo = Math.floor(timeAgo/60);
      // console.log(timeAgo, 'minutes');
      if(timeAgo < 60){
        timeAgo = timeAgo + ' mins ago';
      } else {
        timeAgo = Math.floor(timeAgo/60);
        // console.log(timeAgo, 'hours');
        if(timeAgo == 1){
          timeAgo = timeAgo + ' hr ago';
        } else {
          timeAgo = timeAgo + ' hrs ago';
        }
      }
    }
    return timeAgo;
  }
}

module.exports = Time;
