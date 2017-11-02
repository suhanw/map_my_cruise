import React from 'react';

class ResourceNotFound extends React.Component {

  render() {
    return (
      <section className="resource-not-found">
        {this.props.errors} You might be trapped in a time loop.
        <iframe src="https://i.imgur.com/MxWcYgo/embed" scrolling="no"></iframe>
      </section>
    );
  }
}

export default ResourceNotFound;
