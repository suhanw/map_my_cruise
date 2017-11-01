import React from 'react';
import Spinner from '../spinner';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    const { body, workout_id, user } = this.props.comment;

    this.state = {
      body,
      workout_id,
      user_id: user.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  render() {
    let user = this.props.comment.user;
    return(
      <section className="workout-comment-form-section">
        <img className="comment-author-avatar" src={user.avatar_url} />
        <form className="workout-comment-form">
          {this.renderErrors()}
          <input className="input-text"
            type='text'
            placeholder="Write a comment!"
            value={this.state.body}
            onChange={this.handleChange} />
          <button className="blue-button"
            onClick={this.handleClick}>POST</button>
        </form>
      </section>
    );
  }

  renderErrors() {
    if (this.props.errors.comments.length) {
      const errorItems = this.props.errors.comments.map((error, i)=>{
        return (
          <li key={i}>{error}</li>
        );
      });
      return (
        <ul className="comment-errors">
          {errorItems}
        </ul>
      );
    }
    return null;
  }

  handleChange(e) {
    this.setState({body: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    this.props.createComment(this.state).then(
      ({payload: {comments}}) => { //destructure comments out of action
        let commentId = parseInt(Object.keys(comments)[0]); //get the comment id which is a key
        let workoutId = comments[commentId].workout_id;
        this.props.fetchWorkout(workoutId);
        this.setState({
          body: '',
        });
      }
    );
  }
}

export default CommentForm;
