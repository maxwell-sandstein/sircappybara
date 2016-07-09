'use strict'

const React = require('react');
const SessionStore = require('../../stores/session_store');
const FriendRequestTab = require('./Tabs/friend_request_tabs');
const SessionActions = require('../../actions/session_actions');

const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

const LoggedInHeader = React.createClass({
  getInitialState(){
    return {search: "", friendRequestDisplay: false}
  },

  updateSearch(e){
    this.setState({search: e.currentTarget.value});
  },

  handleSubmit(e){
    e.preventDefault();
  },

  toggleFriendRequests(){
    let toggledState = this.state.friendRequestDisplay ? false : true;
    this.setState({friendRequestDisplay: toggledState});
  },

  handleLogout(){
    SessionActions.logOut();
    this.toHome();
  },

  toHome(){
    browserHistory.push('/');
  },

  toProfile(){
    const currentUserId = SessionStore.currentUser().id;
    browserHistory.push(`/profile/${currentUserId}`);
  },

  render(){
    let friendRequestTab

    if (this.state.friendRequestDisplay === true){
      friendRequestTab = <FriendRequestTab/>;
    } else{
      friendRequestTab ='';
    }

    return(
      <header className="logged-in-header">

        <div className="search-bar">
          <form className="search-bar-form" onSubmit={this.handleSubmit}>
            <div className="search-bar-inputs">
            <input className="search-input" value={this.state.search}
              onChange={this.updateSearch}
            />

          <input type="submit" className='search-submit' value="Search"/>
            </div>
          </form>
        </div>

        <div className="header-buttons">
          <a className="header-button" onClick={this.toProfile}> {SessionStore.currentUser().username} </a>
          <div className='header-btn-divider'></div>
          <a className="header-button" onClick={this.toHome}>Home</a>
          <div className='header-btn-divider'></div>
          <a className="header-button" onClick={this.toggleFriendRequests}>Friend Requests</a>
          <div className='header-btn-divider'></div>
          <a className="header-button logout-btn" onClick={this.handleLogout}>Log Out</a>
        </div>

        {friendRequestTab}
      </header>
    )
  }
})

// <button className="header-button">Messages</button>

module.exports = LoggedInHeader;
