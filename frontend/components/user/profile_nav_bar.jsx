const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const UserStore = require('../../stores/user_store');
const UserActions = require('../../actions/user_actions');

const ProfileNavBar = React.createClass({
  render(){

    return (
      <div className='profile-nav-bar'>
        <a className="profile-nav-btn" onClick={this.props.renderTimeline}>Timeline</a>
        <a className="profile-nav-btn" onClick={this.props.renderAbout}>About</a>
        <a className="profile-nav-btn" onClick={this.props.renderFriends}>Friends</a>
      </div>
    )
  }
})

module.exports = ProfileNavBar;
