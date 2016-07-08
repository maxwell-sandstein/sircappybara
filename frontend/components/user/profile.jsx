const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const Header = require('../Header/Header.jsx')
const UserStore = require('../../stores/user_store');
const UserActions = require('../../actions/user_actions');
const ProfileHeader = require('./profile_header');
const ProfileNavBar = require('./profile_nav_bar');
const ProfileMain = require('./profile_main');


const ProfilePage = React.createClass({
  getInitialState(){
    return {user: {}, ownProfile: false, displayedTab: 'timeline'};
  },

  componentDidMount(){
    this.profileUserListener = UserStore.addListener(this.updateProfileUser);

    this.fetchUser();
  },

  componentWillUnmount(){
    this.profileUserListener.remove()
    UserActions.resetProfileUser();
  },

  componentWillReceiveProps(newProps){
    if (newProps.params.userId !== undefined){
      this.fetchUser(newProps.params.userId);
    }

    this.setState({displayedTab: 'timeline'});
  },

  fetchUser(id){
    if (id === undefined){
      id = this.props.params.userId
    }

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

  renderTimeline(e){
    if (e !== undefined){
     e.preventDefault();
    }

    this.setState({displayedTab: 'timeline'});
  },

  renderAbout(e){
    e.preventDefault()
    this.setState({displayedTab: 'about'})
  },

  renderFriends(e){
    e.preventDefault()
    this.setState({displayedTab: 'friends'})
  },

  render(){

    return (
      <div className='profile-page'>
        <Header/>
        <ProfileHeader ownProfile={this.state.ownProfile} user={this.state.user}/>
        <ProfileNavBar user={this.state.user} renderTimeline={this.renderTimeline}
          renderAbout={this.renderAbout} renderFriends={this.renderFriends} displayedTab={this.state.displayedTab} />
        <ProfileMain user={this.state.user} displayedTab={this.state.displayedTab} ownProfile={this.state.ownProfile}/>
      </div>
    );
  }
});


module.exports = ProfilePage;
