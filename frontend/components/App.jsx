"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const NavBar = require('../components/navbar/navbar.jsx');



const App = React.createClass({

  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render() {
    return (
      <div>
        <NavBar />
        <header>
          <Link to="/" className="header-link"><h1>Sir Capstone, III</h1></Link>
        </header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
