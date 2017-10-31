import React from 'react';

class ConfirmDeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {

    let confirmMessage;
    if (this.props.modal.confirmDeleteRoute) {
      confirmMessage = 'DELETE ROUTE?';
    } else if (this.props.modal.confirmDeleteWorkout) {
      confirmMessage = 'DELETE WORKOUT?';
    }

    return(
      <div className="modal">
        <h1>{confirmMessage}</h1>
        <img src="https://media.giphy.com/media/sKq26uRsmRt4s/giphy.gif" />
        <button className="ok-button" onClick={this.handleClick}>OK</button>
        <button className="cancel-button" onClick={this.props.closeModal}>Cancel</button>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatchAction(Object.values(this.props.modal)[0]);
    this.props.closeModal();
    let redirectPath;
    if (this.props.modal.confirmDeleteRoute) {
      redirectPath = '/routes';
    } else if (this.props.modal.confirmDeleteWorkout) {
      redirectPath = '/workouts';
    }
    this.props.history.push(redirectPath);
  }
}

export default ConfirmDeleteModal;
