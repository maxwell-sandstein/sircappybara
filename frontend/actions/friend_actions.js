'use strict'
const AppDispatcher = require('../dispatcher/dispatcher');
const ReactRouter = require('react-router');
const FriendConstants = require('../constants/friend_constants');
const ApiUtil = require('../util/friend_api_util');

const FriendActions = {
  fetchFriends: function(userId) {
    ApiUtil.fetchFriends(userId, this.receiveFriends);
  },

  requestFriend: function(userId, friendId){
    const json = {
      friend: {
        requestor_id: userId,
        requestee_id: friendId
      }
    }
    ApiUtil.requestFriend(json, function(json){
      console.log(json.message);
    })
  },

  receiveFriends: function(friends) {
    AppDispatcher.dispatch({
      actionType: FriendConstants.FRIENDS_OF_USER,
      friends: friends
    });
  },

  fetchFriendRequests: function(user_id){
    ApiUtil.fetchFriendRequests(user_id, this.receiveFriendRequests)
  },

  receiveFriendRequests: function(friends){
    AppDispatcher.dispatch({
      actionType: FriendConstants.FRIEND_REQUESTS,
      friends: friends
    });
  },

  confirmRequest: function(requestorId, requesteeId){
    ApiUtil.confirmRequest(requestorId, requesteeId, this.removePendingRequest)
  },

  removePendingRequest: function(newFriend){
    AppDispatcher.dispatch({
      actionType: FriendConstants.NEW_FRIEND,
      newFriendId: newFriend.id
    });
  }
}

module.exports = FriendActions;
