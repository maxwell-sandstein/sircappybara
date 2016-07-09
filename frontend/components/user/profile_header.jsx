'use strict'

const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');

const UserStore = require('../../stores/user_store');
const UserActions = require('../../actions/user_actions');
const PhotoActions = require('../../actions/photo_actions');
const FriendActions = require('../../actions/friend_actions');


//need a add friend vs friend button contingent on user logged in and based on friends

//REMEMBER we have props ownProfile and user
const ProfileHeader = React.createClass({
  changeProfilePhoto(){
    cloudinary.openUploadWidget(cloudinary_options, (err, collection) => {
       if (err === null){
         this.sendProfilePhoto(collection[0].url);
       }
       else{
         return "error"
       }
    })
  },

  sendProfilePhoto(photo_url){
    PhotoActions.createPhoto(this.props.user.id, this.props.user.profileAlbumId, photo_url);
  },

  requestFriend(){
    FriendActions.requestFriend(SessionStore.currentUser().id, this.props.user.id)
  },

  changeCoverPhoto(){
    cloudinary.openUploadWidget(cloudinary_options, (err, collection) => {
       if (err === null){
         this.sendCoverPhoto(collection[0].url);
       }
       else{
         return "error"
       }
    })
  },

  friendButton(){
    if (SessionStore.currentUser().id === undefined ||
      SessionStore.currentUser().id === this.props.user.id){
      return '';
    }

    if (SessionStore.currentUser().friends.some((friend) => {
      return friend.id === this.props.user.id;
    })){
      return (<div className='friend-btn-container'>
               <button className='is-friend-btn'>friends</button>
              </div>);
    } else{
      return (<div className='friend-btn-container'>
               <button className='friend-request-btn' onClick={this.requestFriend}>add friend</button>
             </div>);
    }
  },

  sendCoverPhoto(photo_url){
    PhotoActions.createPhoto(this.props.user.id, this.props.user.coverAlbumId, photo_url);
  },

  render(){
    let profilePhotoBtn = <div></div>;
    let coverPhotoBtn = <div></div>;
    if (this.props.ownProfile === true){
      profilePhotoBtn = <button className="profile-photo-btn" onClick={this.changeProfilePhoto}> update profile photo</button>;
      coverPhotoBtn = <button className="cover-photo-btn" onClick={this.changeCoverPhoto}>update cover photo</button>;
    }
    //make this.props.user.profilePic !== undefined  ? our pic else a black image
    return (
      <header className="profile-header">
        <container className="profile-photo-container">
          <img className='profile-pic' src={this.props.user.profilePic} />
          {profilePhotoBtn}
        </container>

        <container className="cover-photo-container" >
          <img className='cover-photo' src={this.props.user.coverPhoto} />
          {coverPhotoBtn}
          {this.friendButton()}

        </container>
        <span className='user-profile-name'>{this.props.user.name}</span>
      </header>
    );
  }
})

module.exports = ProfileHeader;
