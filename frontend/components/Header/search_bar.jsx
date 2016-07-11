const React = require('react');
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

const SearchBar = React.createClass({
  getInitialState(){
    this.selectedUserIdx = -1;
    this.justClicked = false;
    return {searchInput: ""};
  },

  updateSearch(e){
    this.setState({searchInput: e.currentTarget.value});
  },

  handleSubmit(e){
    e.preventDefault();
    console.log(this.selectedUserIdx);
  },

  setSelectedUserIdx(userId){
    this.selectedUserIdx = userId;
  },

  clickUser(user){
    this.setSelectedUserIdx(user.id);
    this.justClicked = true;
    this.setState({searchInput: user.name})
  },

  userToLi(user){
    let tag = (<li className='user-search-tab' onClick={this.clickUser.bind(this, user)}>
      <img src={user.img_url}/><span>{user.name}</span>
    </li>);
    
    return tag;
  },

  matchedUsers(){
    let users = []
    const searchInputLength = this.state.searchInput.length
    if (searchInputLength === 0){
      this.setSelectedUserIdx(-1);
      return users;
    }
    let firstUserId

    this.props.users.forEach((user) => {
      const username = user.name.slice(0, searchInputLength).toLowerCase()
      const searchInput = this.state.searchInput.toLowerCase()
      if (username === searchInput ){
        firstUserId = user.id
        users.push(this.userToLi(user))
      }
    })

    if (users.length === 1){
      this.setSelectedUserIdx(firstUserId)
    }
    else {if (this.justClicked === true){
            this.justClicked = false;;
          } else {
            this.setSelectedUserIdx(-1);
          }
    }

    return users;
  },

  render(){
    return(
      <div className="search-bar">
        <form className="search-bar-form" onSubmit={this.handleSubmit}>
          <div className="search-bar-inputs">
            <input className="search-input" value={this.state.searchInput}
              onChange={this.updateSearch}
            />

            <input type="submit" className='search-submit' value="Search"/>
          </div>
        </form>
        <ul className='users-autocompleted'>
          {this.matchedUsers()}
        </ul>
      </div>
    )
  }
});

module.exports = SearchBar;
