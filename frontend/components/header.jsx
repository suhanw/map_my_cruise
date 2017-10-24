import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render(){
    return (
      <header>
        {this.renderNavBar()}
        {this.renderShortcutBar()}
      </header>
    );
  }



  renderNavBar() {

    let profileSection = (
      <section>
        <Link to="/login" className='profile-login'>LOG IN</Link>
        <Link to="/signup" className='profile-signup'>SIGN UP</Link>
      </section>
    );

    let currentUser = this.props.currentUser;
    if (currentUser) {
      profileSection = (
        <section className="profile">
          <button onClick={this.props.logout}>
            Logout
          </button>
        </section>
      );
    }

    return (
      <section className="nav-main">
        <nav className='nav-bar'>
          <h1 className='nav-logo'>
            <i className="fa fa-wheelchair-alt" aria-hidden="true"></i>
            mapmyrun
          </h1>
          <ul className='nav-bar-links'>
            <li>ROUTES</li>
            <li>WORKOUTS</li>
            <li>FRIENDS</li>
          </ul>
        </nav>
        {profileSection}
      </section>
    );
  }

  renderShortcutBar() {
    return (
      <section className="shortcut-main">
        <nav className="shortcut-bar">
          <ul className="shortcut-bar-links">
            <li>Workout Dashboard</li>
            <li>Create Route</li>
            <li>Log Workout</li>
            <li>Find Friends</li>
          </ul>
        </nav>
      </section>
    );
  }

  handleClick(e) {
    this.props.logout();
  }
}

export default Header;
