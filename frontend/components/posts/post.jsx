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
      Receiver = (<span className='enclosing-span'>
                    <span className='to'>&nbsp;to</span>
                    <span className='receiver-name' onClick={this.toUserProfile.bind(this, post.receiverId)}>
                      &nbsp;{post.receiverName}</span>
                  </span>)
    }
    return(
      <li>
        <div className='post-holder'>
          <div className='poster-info'>
            <container className='post-profile-img-container'>
              <img src={post.authorImgUrl}/>
            </container>
            <div className='poster-stuff'><span className='poster-name' onClick={this.toUserProfile.bind(this, post.authorId)}>
              {post.authorName}</span> {Receiver}</div>
          </div>
          <p className='post-body'>
            {post.body}
          </p>
          <div className='post-menu'>
            <button>Like</button>
          </div>
        </div>
      </li>
    )
  }
})

module.exports = Post;
