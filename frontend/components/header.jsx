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

  renderAvatar() {

    let avatarDropdown = (
      <ul className="avatar-dropdown">
        <li><Link to="/edit_profile">Settings</Link></li>
        <li><button onClick={this.props.logout}>Logout</button></li>
      </ul>
    );


    return (
      <section className="avatar">
        {`Welcome, ${this.props.currentUser.fname} ${this.props.currentUser.lname}`}
        <img src={this.props.currentUser.avatar_url} />
        {avatarDropdown}
      </section>
    );
  }


  renderNavBar() {

    let loggedIn = Boolean(this.props.currentUser);

    let profileSection = loggedIn ?
      this.renderAvatar() : (
        <section>
          <Link to="/login" className='profile-login'>LOG IN</Link>
          <Link to="/signup" className='profile-signup'>SIGN UP</Link>
        </section>
      );

    return (
      <section className="nav-main">
        <nav className='nav-bar'>
          <Link to="/">
            <h1 className='nav-logo'>
              <i className="fa fa-superpowers" aria-hidden="true"></i>
              mapmycruise
            </h1>
          </Link>
          <ul className='nav-bar-links'>
            <li>
              <Link to="/routes">
                ROUTES
              </Link>
            </li>
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
