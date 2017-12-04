/* globals Pusher */

import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderShortcutBar = this.renderShortcutBar.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render(){
    return (
      <header>
        {this.renderNotifications()}
        {this.renderNavBar()}
        {this.renderShortcutBar()}
      </header>
    );
  }

  renderAvatar() {

    let avatarDropdown = (
      <ul className="avatar-dropdown">
        <Link to="/edit_profile"><li>Settings</li></Link>
        <a onClick={this.props.logout}><li>Logout</li></a>
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

      let routesDropdown = (
        <ul className="routes-dropdown">
          <Link to="/routes/create"><li>Create Route</li></Link>
          <Link to="/routes"><li>My Routes</li></Link>
        </ul>
      );

      let workoutsDropdown = (
        <ul className="workouts-dropdown">
          <Link to="/workouts/create"><li>Log Workout</li></Link>
          <Link to="/workouts"><li>My Workouts</li></Link>
        </ul>
      );

      let friendsDropdown = (
        <ul className="friends-dropdown">
          <Link to="/friends/find"><li>Find Friends</li></Link>
          <Link to="/friends"><li>My Friends</li></Link>
        </ul>
      );

    return (
      <section className="nav-main">
        <nav className='nav-bar'>
          <Link to="/">
            <h1 className='nav-logo'>
              <i className="fa fa-fighter-jet" aria-hidden="true"></i>
              mapmycruise
            </h1>
          </Link>
          <ul className='nav-bar-links'>
            <li className='nav-bar-routes'>
              ROUTES
              {routesDropdown}
            </li>
            <li className="nav-bar-workouts">
              WORKOUTS
              {workoutsDropdown}
            </li>
            <li className="nav-bar-friends">
              FRIENDS
              {friendsDropdown}
            </li>
          </ul>
        </nav>
        {profileSection}
      </section>
    );
  }

  renderNotifications() {
    let pusher = new Pusher('18fcca192420fc0ccfe4', {
      cluster: 'us2',
      encrypted: true
    });

    let channel = pusher.subscribe(`user_${this.props.currentUser.id}`);
    channel.bind('my-event', (data)=>{
      console.log(data.message);
    });
  }

  renderShortcutBar() {
    return (
      <section className="shortcut-main">
        <nav className="shortcut-bar">
          <ul className="shortcut-bar-links">
            <Link to="/dashboard"><li>My Dashboard</li></Link>
            <Link to="/routes/create"><li>Create Route</li></Link>
            <Link to="/workouts/create"><li>Log Workout</li></Link>
            <Link to="/friends/find"><li>Find Friends</li></Link>
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
