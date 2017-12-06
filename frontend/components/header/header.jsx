/* globals Pusher */

import React from 'react';
import {Link} from 'react-router-dom';
import NotificationItem from './notification_item';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.pusher = new Pusher('18fcca192420fc0ccfe4', {
      cluster: 'us2',
      encrypted: true
    });

    this.state = {
      loadingNotifications: true,
      notificationDropdownActive: false,
    };

    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderShortcutBar = this.renderShortcutBar.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleNotificationDropdown = this.toggleNotificationDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  render(){
    return (
      <header>
        {this.renderNavBar()}
        {this.renderShortcutBar()}
      </header>
    );
  }

  componentDidMount() {
    const that = this;
    document.addEventListener('click', (e)=>{
      that.hideDropdown(e);
    });
  }

  renderAvatar() {

    let avatarDropdown = (
      <ul className="avatar-dropdown">
        <Link to="/edit_profile"><li>Settings</li></Link>
        <a onClick={this.handleLogout}><li>Logout</li></a>
      </ul>
    );


    return (
      <section className="avatar">
        <img src={this.props.currentUser.avatar_url} />
        <span>
          {`${this.props.currentUser.fname} ${this.props.currentUser.lname}`}
        </span>
        {avatarDropdown}
      </section>
    );
  }

  renderNavBar() {
    let loggedIn = Boolean(this.props.currentUser);
    let profileSection = (
        <section>
          <Link to="/login" className='profile-login'>LOG IN</Link>
          <Link to="/signup" className='profile-signup'>SIGN UP</Link>
        </section>
      );
    let notificationSection = null;

    if (loggedIn) {
      profileSection = this.renderAvatar();
      notificationSection = this.renderNotifications();
    }

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
        {notificationSection}
        {profileSection}
      </section>
    );
  }

  renderNotifications() {
    if (this.state.loadingNotifications) {
      this.props.fetchNotifications().then(
        () => this.setState({loadingNotifications: false})
      );
      return null;
    }

    const {notifications_by_id, ordered_ids} = this.props.notifications;
    let unread_count = this.props.notifications.unread_count;

    let channel = this.pusher.subscribe(`user_${this.props.currentUser.id}`);
    channel.bind('notification_event', (data)=>{
      this.props.fetchNotifications();
    });

    let badgeIcon = (
      <div className={`badge-icon ${unread_count > 0 ? '': 'hidden'}`}>
        {unread_count}
      </div>
    );

    let notificationDropdown = (
      <ul className={`notification-dropdown ${this.state.notificationDropdownActive ? "active" : ""}`}>
        {ordered_ids.map((id)=> <NotificationItem key={id} notification={notifications_by_id[id]} notificationDropdownActive={this.state.notificationDropdownActive}/>)}
      </ul>
    );

    return (
      <section className="notifications">
        <i className="fa fa-bell-o" aria-hidden="true" onClick={this.toggleNotificationDropdown}>
          {badgeIcon}
        </i>
        <span>
          Notifications
        </span>
        {notificationDropdown}
      </section>
    );
  }

  toggleNotificationDropdown(e) {
    e.nativeEvent.stopImmediatePropagation();
    if (this.state.notificationDropdownActive) {
      this.setState({notificationDropdownActive: false});
    } else {

      this.setState({notificationDropdownActive: true});
    }
  }

  hideDropdown(e) {
    this.setState({notificationDropdownActive: false});
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

  handleLogout(e) {
    this.props.logout().then(
      ()=>this.setState({loadingNotifications:true}) // to make sure notifications are fetched on the next logon
    );
  }
}

export default Header;
