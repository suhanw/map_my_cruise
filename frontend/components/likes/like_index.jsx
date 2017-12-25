import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../spinner';
// import {createLike, deleteLike} from '../../actions/likes_actions';

const mapStateToProps = (state, ownProps) => {
  const {session: {currentUser}, entities: {users}} = state;
  const workoutId = ownProps.workoutId;
  return {
    currentUser,
    users,
    workoutId,
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
    return (
      <div className="workout-likes">
        This will be likes (coming soon)
      </div>
    );
  }
}

export default connect
  (mapStateToProps, mapDispatchToProps)
  (LikeIndex);
