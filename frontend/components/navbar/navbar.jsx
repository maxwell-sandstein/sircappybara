const React = require('react');

const NavBarRight = require('./navbar_right.jsx');

const NavBar = React.createClass({

  render () {
    return(
      <div className='navbar'>
        <NavBarRight />
      </div>
    );
  }
});

module.exports = NavBar;
