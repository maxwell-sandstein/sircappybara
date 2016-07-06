"use strict";

const React = require('react');
const SessionActions = require('../../actions/session_actions');
const UserActions = require('../../actions/user_actions');
const Header = require('../Header/Header');
const SessionStore = require('../../stores/session_store');

const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

const Feed = React.createClass({
  getInitialState(){
    return {
      gender: undefined,
      breed: undefined,
      birthday: undefined
    };
  },

  handleLogout(){
    SessionActions.logOut();
  },

  handleUserInfoSubmit(e){
//send to update user
    e.preventDefault();
    const form_data = {};

    if (this.state.gender !== undefined){
      form_data.gender = this.state.gender;
    }

    if (this.state.breed !== undefined){
      form_data.breed = this.state.breed;
    }

    if (this.state.birthday !== undefined){
      form_data.birthday = this.state.birthday;
    }

    const currentUserId = SessionStore.currentUser().id;

    UserActions.updateUser(currentUserId, form_data)
  },

  updateBreed(e){
    this.setState({breed: e.currentTarget.value});
  },

  updateGender(e){
    this.setState({gender: e.currentTarget.value});
  },

  updateDate(e){
    this.setState({birthday: e.currentTarget.value});
  },

  goToFirstUser(e){
    e.preventDefault();
    browserHistory.push('/profile/1');
  },

  render(){
    if (this.props.newUser === true){
      return(
        <div className='additional-info-form'>

          <Header/>
          <form onSubmit={this.handleUserInfoSubmit}>

            <label>
              Breed
              <input type='text' value={this.state.breed} onChange={ this.updateBreed}/>
            </label>

            <label>
              Male
              <input type='radio' name='gender' value='male' onChange={ this.updateGender}/>
            </label>

            <label>
              Female
              <input type='radio' name='gender' value='female' onChange={ this.updateGender}/>
            </label>

            <label>
              Birthday
              <input type='date' onChange= { this.updateDate}/>
            </label>

            <input type='submit' value='Update' className='additional-info-submit-btn' />
          </form>
            <button onClick={this.handleLogout}>Log Out</button>
        </div>
      )
    }
    else{
      return(
        <div className="feed">
          <Header />
          <a onClick={this.goToFirstUser}>First User</a>
          Feed Running
          <button onClick={this.handleLogout}>Log Out</button>
        </div>
      );
    }
  }
});

module.exports = Feed;
