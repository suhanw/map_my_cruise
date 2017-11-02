import React from 'react';
import {Link, Switch} from 'react-router-dom';
import FriendIndexContainer from './friend_index_container';
import {ProtectRoute} from '../../util/route_util';
import {randomizer} from '../../util/randomizer';
import UserSearchContainer from './user_search_container';

class DisplayFriends extends React.Component {
  render() {
    return (
      <section className="display-friends-container">
        <h2>MY FRIENDS</h2>
        <Switch>
          <ProtectRoute path="/friends/find" component={UserSearchContainer} />
          <ProtectRoute path="/friends" component={FriendIndexContainer} />
        </Switch>
      </section>
    );
  }
}

export default DisplayFriends;
