const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const Header = require('../Header/Header.jsx')
const UserStore = require('../../stores/user_store');
const UserActions = require('../../actions/user_actions');
const ProfileHeader = require('./profile_header');

const ProfilePage = React.createClass({
  getInitialState(){
    return {user: {}, ownProfile: false};
  },

  componentDidMount(){
    this.profileUserListener = UserStore.addListener(this.updateProfileUser);

    this.fetchUser();
  },

  componentWillUnmount(){
    UserStore.remove(this.profileUserListener);
    UserActions.resetProfileUser();
  },

  componentWillReceiveProps(){
    this.fetchUser();
  },

  fetchUser(){
    let id = this.props.params.userId
    UserActions.fetchUser(id);
  },

  updateProfileUser(){
    let profileUser = UserStore.profileUser();

    this.setState({user: profileUser}, this.checkForOwnProfile);
  },

  checkForOwnProfile(){
    if (this.ownProfile()){
      this.setState({ownProfile: true})
    }
  },

  ownProfile(){
    return (SessionStore.currentUser().id === this.state.user.id);
  },

  render(){
    return (
      <div className='profile-page'>
        <Header/>
        <ProfileHeader ownProfile={this.state.ownProfile} user={this.state.user}/>
        <span>{this.state.user.name}</span>
        <span>Successfully hit profile</span>
      </div>
    );
  }
});


module.exports = ProfilePage;
