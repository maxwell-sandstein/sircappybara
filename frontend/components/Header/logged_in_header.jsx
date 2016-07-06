'use strict'

const React = require('react');
const SessionStore = require('../../stores/session_store');

const LoggedInHeader = React.createClass({
  getInitialState(){
    return {search: ""}
  },

  updateSearch(e){
    this.setState({search: e.currentTarget.value});
  },

  handleSubmit(e){
    e.preventDefault();
  },

  render(){
    return(
      <header className="logged-in-header">

        <div className="search-bar">
          <form className="search-bar-form" onSubmit={this.handleSubmit}>
            <div className="search-bar-inputs">
            <input className="searchInput" value={this.state.search}
              onChange={this.updateSearch}
            />

            <input type="submit" value="Search"/>
            </div>
          </form>
        </div>

        <div className="header-buttons">
          <button className="header-button"> {SessionStore.currentUser().username} </button>
          <button className="header-button">Home</button>
          <button className="header-button">Friend Requests</button>
          <button className="header-button">Messages</button>
          <button className="header-button">Notifications</button>
        </div>
      </header>
    )
  }
})



module.exports = LoggedInHeader;
