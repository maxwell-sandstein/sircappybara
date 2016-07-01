const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../../actions/session_actions');

const SessionStore = require('../../stores/session_store');

const NavBarRight = React.createClass({



  render () {

    if (SessionStore.isUserLoggedIn()) {

    return (
    		<hgroup className="header-group">
    			<h2 className="header-name">Hi, {SessionStore.currentUser().username}!</h2>
    			<input className="header-button" type="submit" value="logout" onClick={ SessionActions.logOut } />
    		</hgroup>
    	);

    }  else {

    return (
      <div className='navbar-right'>
        <Link to="/signup" className="navigation-link">Sign Up!</Link>
        <Link to="/login" className="navigation-link">Log In!</Link>

      </div>
    );
  }
  }
});

module.exports = NavBarRight;
