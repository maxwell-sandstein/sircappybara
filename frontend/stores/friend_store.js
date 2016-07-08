"use strict";

const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const FriendConstants = require('../constants/friend_constants');

const FriendStore = new Store(AppDispatcher);

let _friends = {}

FriendStore.friends = function(){
  const friends = Object.keys(_friends).map(function(friendId){
    return _friends[friendId]
  })

  return friends;
}

FriendStore.resetFriends = function(){
  _friends = {};
}

FriendStore.storeFriends = function(friends){
  FriendStore.resetFriends()

  friends.forEach((friend) => {
    _friends[friend.id] = friend;
  })
}

FriendStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case FriendConstants.FRIENDS_OF_USER:
      FriendStore.storeFriends(payload.friends);
      break;
  }

  FriendStore.__emitChange();
}

module.exports = FriendStore
