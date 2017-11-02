import React from 'react';
import Spinner from '../spinner';
import FriendIndexItem from './friend_index_item';

class UserSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      loading: false,
    };

    this.renderUserSearchResults = this.renderUserSearchResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render(){
    return (
      <section className="user-search">
        <form className="user-search-form">
          <input type="text"
            className="input-text"
            onChange={this.handleChange} />
          <button type="button"
            className="orange-button"
            onClick={this.handleClick}>SEARCH</button>
        </form>

        <section className="user-search-results">
          {this.renderUserSearchResults()}
        </section>
      </section>
    );
  }

  renderUserSearchResults() {
    const {
      userSearchResults,
      users,
      createFriendStatus,
      fetchFriendStatuses
    } = this.props;

    if (this.state.loading) {
      return (
        <div className="spinner-box">
          <Spinner />
        </div>
      );
    }

    const userSearchResultsDom = userSearchResults.map((userId) => {
      const friendStatus = { friendee_id: userId }; //all you need to make friend request
      return (
        <FriendIndexItem key={userId}
          user={users[userId]}
          friendStatus={friendStatus}
          friendType="userSearchResult"
          action={createFriendStatus}
          fetchFriendStatuses={fetchFriendStatuses} />
      );
    });

    return (
      <ul>
        {userSearchResultsDom}
      </ul>
    );

  }

  handleChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({loading: true});
    this.props.searchUsers(this.state.searchTerm).then(
      () => this.setState({loading: false})
    );
  }
}

export default UserSearch;
