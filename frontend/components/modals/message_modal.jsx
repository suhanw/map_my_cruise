import React from 'react';

class MessageModal extends React.Component {

  render() {
    return(
      <div className={this.props.className}>
        {this.props.message}
      </div>
    );
  }
}

export default MessageModal;
