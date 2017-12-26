import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import {createLike, deleteLike} from '../../actions/likes_actions';

const mapStateToProps = (state, ownProps) => {
  const {session: {currentUser}, entities: {users, likes}} = state;
  const {likableLikes} = ownProps;

  let likesArray = [];
  if (likableLikes && likableLikes.length) { //to check if likable has likes
    likesArray = likableLikes.map((likeId) => {
      return likes[likeId];
    });
  }

  return {
    currentUser,
    users,
    likesArray,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {fetchLikable, likableType, likableId} = ownProps;
  return {
    createLike: () => dispatch(createLike(likableType, likableId)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    fetchLikable: () => fetchLikable(likableId),
  };
};

class LikeIndex extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLike = this.toggleLike.bind(this);
  }

  render() {
    let numLikes = this.props.likesArray.length;
    let currentUserLikeClass;
    let likesText = '';

    // if no likes, render 'Be the first to like this'
    if (numLikes === 0) likesText = ' be the first to like this';
    // else, render how many people like it
    else {
      // if currentUser likes, colorize icon
      if (this.currentUserLike) {
        currentUserLikeClass = 'current-user-like';
        likesText = ` You ${numLikes > 1 ? 'and' : ''}`;
        numLikes--;
      }
      if (numLikes > 0) {
        likesText += ` ${numLikes} ${numLikes > 1 ? 'people' : 'person'}`;
      }
      likesText += ` liked this`;
    }

    return (
      <div className="likes">
        <i className={`fa fa-thumbs-o-up ${currentUserLikeClass}`} aria-hidden="true"
          onClick={this.toggleLike}></i>
        {likesText}
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.likesArray.length) {
      this.currentUserLike = newProps.likesArray.find((like)=>{
        return like && like.user_id === this.props.currentUser.id;
      });
    }
  }

  toggleLike() {
    if (this.currentUserLike) {
      this.props.deleteLike(this.currentUserLike.id).then(
        () => {
          this.currentUserLike = null;
          this.props.fetchLikable();
        }
      );
    } else {
      this.props.createLike().then(
        (action) => {
          let currentUserLikeId = parseInt(Object.keys(action.payload.likes));
          this.currentUserLike = action.payload.likes[currentUserLikeId];
          this.props.fetchLikable();
        }
      );
    }
  }
}

export default connect
  (mapStateToProps, mapDispatchToProps)
  (LikeIndex);
