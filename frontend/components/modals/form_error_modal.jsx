import React from 'react';

class FormErrorModal extends React.Component {

  render() {
    const errorsDom = this.props.errors.map((error, i) => {
      return (
        <li key={i}>{error}</li>
      );
    });

    return (
      <div className="modal-backdrop">
        <div className="modal form-error">
          <h1>Errors</h1>
          <img src="https://media.giphy.com/media/xUHVbjyYeC1Z6/giphy.gif" />
          <ul>
            {errorsDom}
          </ul>
          <button className="close-button">
            CLOSE
          </button>
        </div>
      </div>
    );
  }

}

export default FormErrorModal;
