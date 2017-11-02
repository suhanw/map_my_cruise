import React from 'react';

class Spinner extends React.Component {
  render() {

    if (this.props.spinnerType === 'session') {
      return (
        <section className="spinner">
          {this.props.spinnerMessage}
          <img src="https://media.giphy.com/media/vflsxbiPVchgc/giphy.gif" />
        </section>
      );
    }

    return(
      <section className="spinner">
        Please wait while Tom Cruise steals the data for you...
        <img src="https://media.giphy.com/media/kStj2Lj6DELPW/giphy.gif" />
      </section>
    );
  }
}

export default Spinner;
