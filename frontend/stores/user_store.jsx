"use strict";

const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const UserConstants = require('../constants/user_constants');

const UserStore = new Store(AppDispatcher);

let _profileUser = {};

UserStore.profileUser = function(){
  return _profileUser;
}

UserStore.resetProfileUser = function(){
  _profileUser = {};
}

UserStore.setProfileUser = function(user){
  _profileUser = user;
}

UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants.NEW_PROFILE_USER:
      UserStore.setProfileUser(payload.user) //check
      break;
    case UserConstants.RESET_PROFILE_USER:
         UserStore.resetProfileUser();
      break;
  }

  UserStore.__emitChange();
}


module.exports = UserStore;
