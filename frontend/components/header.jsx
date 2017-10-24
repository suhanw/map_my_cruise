import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render(){
    let currentUser = this.props.currentUser;

    let loggedinProfile = null;
    if (currentUser) {
      loggedinProfile = (
        <div>
          Welcome {currentUser.fname}!
          <button onClick={this.handleClick}>
              Logout
          </button>
        </div>
      );
    }
    return loggedinProfile;
  }

  handleClick(e) {
    this.props.logout();
  }
}

export default Header;
