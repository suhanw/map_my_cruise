import React from 'react';
import {Link} from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import Modal from '../modals/modal';
import ConfirmDeleteModal from '../modals/confirm_delete_modal';
import Spinner from '../spinner';

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoutes();
  }

  render(){
    if (this.props.loading) {
      return (
        <div className="spinner-box">
          <Spinner />;
        </div>
      );
    }

    if (!Boolean(this.props.routes.ordered_ids.length)) {
      return (
        <section className="route-index-container">
          You have no routes.
          Click <Link to="/routes/create">here</Link> to create a new route.
        </section>
      )
    }

    return (
      <section className="route-index-container">
        <Modal modal={this.props.modal}
          component={ConfirmDeleteModal}
          closeModal={this.props.closeModal}
          dispatchAction={this.props.deleteRoute} />
        <div>
          <h2>
            MY ROUTES
          </h2>
          <Link to="routes/create" className="create-route-button">CREATE A ROUTE</Link>
        </div>

        <section className="search-and-sort">
          <input className="route-search-input" type="search" placeholder="coming soon" />
          <button className="route-search-button">SEARCH</button>
          <button className="route-search-reset">Reset</button>
          <select className="route-sort-options">
            <option>Most Recent</option>
            <option>Oldest</option>
            <option>Longest</option>
            <option>Shortest</option>
          </select>
        </section>

        <table className="route-index-table">
          <tbody className="route-index-tbody">
            <tr>
              <th>Route</th>
              <th>Created / Updated</th>
              <th>Distance</th>
              <th>Name</th>
              <th>City</th>
              <th>Privacy</th>
              <th>Options</th>
            </tr>

            {this.renderItems()}

          </tbody>
        </table>

        <ul className="paginator">
          <li className="inactive-page-link">PREV</li>
          <li className="inactive-page-link">1</li>
          <li className="inactive-page-link">NEXT</li>
        </ul>

      </section>
    );
  }

  renderItems(){
    let items = [];
    this.props.routes.ordered_ids.forEach((id)=> {
      let route = this.props.routes.routes_by_id[id];
      items.push((
          <RouteIndexItem key={id}
            route={route}
            currentUser={this.props.currentUser}
            deleteRoute={this.props.deleteRoute}
            openModal={this.props.openModal} />
        ));
    });
  return items;
  }
}

export default RouteIndex;
