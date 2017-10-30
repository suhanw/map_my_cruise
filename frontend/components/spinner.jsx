import React from 'react';

class Spinner extends React.Component {
  render() {
    return(
      <section className="spinner">
        Please wait while Tom Cruise steals the data for you...
        <img src="https://media.giphy.com/media/kStj2Lj6DELPW/giphy.gif" />
      </section>
    );
  }
}

export default Spinner;
