import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../spinner';
// import {createLike, deleteLike} from '../../actions/likes_actions';

const mapStateToProps = (state, ownProps) => {
  const {session: {currentUser}, entities: {users, likes}} = state;
  const {likableLikes} = ownProps;
  let likesArray = [];
  if (likableLikes.length) { //to check if likable has likes
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

const mapDispatchToProps = (state) => {
  return null;
  // return {
  //   createLike: (workoutId) => dispatch(createLike(workoutId)),
  //   deleteLike: (likeId) => dispatch(deleteLike(likeId)),
  // };
};

class LikeIndex extends React.Component {
  render() {
    const numLikes = this.props.likesArray.length;
    let hasLikes;
    if (numLikes) hasLikes = 'has-likes';
    return (
      <div className="likes">
        <i className={`fa fa-thumbs-o-up ${hasLikes}`} aria-hidden="true"></i>
        {numLikes}
      </div>
    );
  }
}

export default connect
  (mapStateToProps, mapDispatchToProps)
  (LikeIndex);
