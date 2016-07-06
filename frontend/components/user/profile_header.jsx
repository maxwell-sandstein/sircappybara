const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');

const UserStore = require('../../stores/user_store');
const UserActions = require('../../actions/user_actions');


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
    UserActions.updateProfilePic(this.props.user.id, this.props.user.profileAlbumId, photo_url);
  },

  changeCoverPhoto(){

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
        </container>
        <h1 className="user-profile-name">{this.props.user.name}</h1>
      </header>
    );
  }
})

module.exports = ProfileHeader;
