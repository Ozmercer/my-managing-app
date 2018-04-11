'use strict';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}
function makeid(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function lorem(minWord = 1, maxWord = 3 ,minLength = 3, maxLength = 8) {
    var words = getRandomInt(minWord,maxWord);
    var lorem = '';
    for (let i = 0; i < words; i++) {
        lorem += makeid(getRandomInt(minLength,maxLength)) + ' ';
    }
    return lorem.toLowerCase();
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function timeAgo(date) {
    date = new Date(date)
    return moment(date, "YYYYMMDD").fromNow()
}

export default {
    getRandomInt,
    getRandomString : makeid,
    lorem,
    shuffle,
    randomDate,
    timeAgo
}

