"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const saveTweet = (newTweet, callback) => {
    db
      .collection('tweets')
      .insertOne(newTweet, callback);
  };

  const getTweets = (callback) => {
    db
      .collection('tweets')
      .find()
      .toArray(callback);
  };

  return {
    // Saves a tweet to `db`
    saveTweet,
    getTweets,

    // Finds email in `db`
    findUser: function(email, callback) {
      db
        .collection('users')
        .find({"email": email})
        .toArray(callback);
    }
  }
}
