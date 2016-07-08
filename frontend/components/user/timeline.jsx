const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const UserStore = require('../../stores/user_store');


const Timeline = React.createClass({
  render(){
    return (
      <div className='timeline-tab'>
        <span>timeline</span>
      </div>
    )
  }
})

module.exports = Timeline
