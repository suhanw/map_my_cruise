import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import {createLike, deleteLike} from '../../actions/likes_actions';

const mapStateToProps = ({session: {currentUser}, entities: {users, likes}}, ownProps) => {
  // const {session: {currentUser}, entities: {users, likes}} = state;
  const {likableLikes} = ownProps;
  let likesArray = [];
  if (likableLikes.length) { //to check if likable has likes
    likesArray = likableLikes.map((likeId) => {
      return likes[likeId];
    });
  }

  return {
    currentUser,
    likes,
    users,
    likesArray,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {likableType, likableId} = ownProps;
  return {
    createLike: () => dispatch(createLike(likableType, likableId)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
  };
};

class LikeIndex extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLike = this.toggleLike.bind(this);
  }

  render() {
    const numLikes = this.props.likesArray.length;
    let hasLikes;
    if (numLikes) hasLikes = 'has-likes';
    return (
      <div className="likes">
        <i className={`fa fa-thumbs-o-up ${hasLikes}`} aria-hidden="true"
          onClick={this.toggleLike}></i>
        {numLikes}
      </div>
    );
  }

  toggleLike() {
    let currentUserLike = this.props.likesArray.find((like)=>{
      return like.user_id === this.props.currentUser.id;
    });
    if (currentUserLike) {
      this.props.deleteLike(currentUserLike.id);
    } else {
      this.props.createLike();
    }
  }
}

export default connect
  (mapStateToProps, mapDispatchToProps)
  (LikeIndex);
