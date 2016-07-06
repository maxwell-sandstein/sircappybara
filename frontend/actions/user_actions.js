const AppDispatcher = require('../dispatcher/dispatcher');
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;
const UserConstants = require('../constants/user_constants');
const ApiUtil = require('../util/user_api_util');
const PhotoUtil = require('../util/photo_api_util');
const SessionActions = require('./session_actions');



const UserActions = {
  resetProfileUser(){
    AppDispatcher.dispatch({
      actionType: UserConstants.RESET_PROFILE_USER
    })
  },

  fetchUser(id){
    ApiUtil.fetchUser(id, this.receiveProfileUser)
  },

  receiveProfileUser(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.NEW_PROFILE_USER,
      user: user
    })
  },

  updateUser(id, form_data){
    const json = {user: form_data};
    ApiUtil.updateUser(id, json, SessionActions.receiveCurrentUser);
  },

  updateProfilePic(userId, albumId, photo_url){  //look to change
    const json = {
      pic: {
        img_url: photo_url
      }
    };

    PhotoUtil.createProfilePic(userId, albumId, json, this.receiveProfileUser)
  },

  updateCoverPhoto(userId, albumId, photo_url){  //look to change
    const json = {
      pic: {
        img_url: photo_url
      }
    };

    PhotoUtil.createCoverPhoto(userid, albumId, json, this.receiveProfileUser)
  }
};

module.exports = UserActions;
