import React from 'react';
import {Link} from 'react-router-dom';

class NotificationItem extends React.Component {
  render() {
    const {notification} = this.props;
    return(
      <li>{notification.notifiable_type} {notification.notifiable_id}</li>
    );
  }
}

export default NotificationItem;
