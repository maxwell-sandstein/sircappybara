const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const UserStore = require('../../stores/user_store');


const About = React.createClass({
  render(){
    return (
      <div className='about-tab'>
        <div className='friends-header'>
          <h2>About</h2>
        </div>
        <div className='about-display'>
          <span>Name: {this.props.user.name}</span>
          <span>Gender: {this.props.user.gender}</span>
          <span>Breed: {this.props.user.breed}</span>
          <span>Birthday {this.props.user.birthday}</span>
        </div>
      </div>
    )
  }
})

module.exports = About
