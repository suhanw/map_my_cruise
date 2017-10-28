import React from 'react';

class FormErrorModal extends React.Component {

  render() {
    const errorsDom = this.props.modal.errors.map((error) => {
      return (
        <li>{error}</li>
      );
    });

    return (
      <div className="modal">
        <h1>Errors</h1>
        <img src="https://media.giphy.com/media/xUHVbjyYeC1Z6/giphy.gif" />
        <ul>
          {errorsDom}
        </ul>
        <button className="close-button">
          CLOSE
        </button>
      </div>
    );
  }

}

export default FormErrorModal;
