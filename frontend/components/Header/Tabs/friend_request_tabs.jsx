"use strict";

const React = require('react');
const FriendStore = require('../../../stores/friend_store')
const SessionStore = require('../../../stores/session_store')
const FriendActions = require('../../../actions/friend_actions')

const FriendRequestTab = React.createClass({
  getInitialState(){
    return {friend_requests: FriendStore.requestingFriends()};
  },

  componentDidMount(){
    this.requestListener = FriendStore.addListener(this.setFriends);
    FriendActions.fetchFriendRequests(SessionStore.currentUser().id);
  },

  componentWillUnmount(){
    this.requestListener.remove();
  },

  setFriends(){
    this.setState({friend_requests: FriendStore.requestingFriends()})
  },

  confirmRequest(userId){
    const requesteeId = SessionStore.currentUser().id;
    FriendActions.confirmRequest(userId, requesteeId);
  },

  rejectRequest(userId){

  },

  render(){
    return(
      <div className='friend-request-tab'>
        <h6>Friend Requests</h6>
        <ul>
          {
            this.state.friend_requests.map((user) => {
              return (
                <li className='friend-request'>
                  <span>{user.name}</span>
                  <button className='request-confirm'
                    onClick={this.confirmRequest.bind(this, user.id)}>confirm</button>
                  <button className='delete'
                    onClick={this.rejectRequest.bind(this, user.id)}>delete</button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = FriendRequestTab;
