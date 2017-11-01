import React from 'react';
import {Link} from 'react-router-dom';
import FriendIndexItem from './friend_index_item';
import Spinner from '../spinner';

class FriendIndex extends React.Component {
  render() {
    return (
      <section className="friend-index">
        <section className="friends">
          <h3>FRIENDS</h3>
        </section>
        <section className="pending-friends">
          <h3>PENDING REQUESTS</h3>
        </section>
      </section>
    );
  }
}

export default FriendIndex;
