const React = require('react');
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory

const Post = React.createClass({

  toUserProfile(userId){
    browserHistory.push(`/profile/${userId}`);
  },

  render(){
    let post = this.props.post;
    let Receiver = ''

    if (post.authorId !== post.wallId &&  this.props.feed === true){
      Receiver = <span className='receiver-name'> {post.receiverName} </span>
    }
    return(
      <li>
        <div className='post-holder'>
          <h6 onClick={this.toUserProfile.bind(this, post.authorId)}>
            {post.authorName}</h6>
          <p>
            {post.body}
          </p>
          <div clear></div>
        </div>
      </li>
    )
  }
})

module.exports = Post;
