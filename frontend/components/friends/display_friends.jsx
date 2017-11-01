import React from 'react';
import {Link} from 'react-router-dom';
import FriendIndexContainer from './friend_index_container';
import {randomizer} from '../../util/randomizer';

class DisplayFriends extends React.Component {
  render() {
    return (
      <section className="display-friends-container">
        <FriendIndexContainer />
      </section>
    );
  }
}

export default DisplayFriends;
