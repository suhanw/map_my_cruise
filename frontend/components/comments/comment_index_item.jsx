import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';

class CommentIndexItem extends React.Component {
  render() {
    let comment = this.props.comment;
    debugger
    return (
      <li>{comment.body}</li>
    );
  }
}

export default CommentIndexItem;
