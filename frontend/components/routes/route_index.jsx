import React from 'react';
import {Link} from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import Modal from '../modals/modal';
import ConfirmDeleteModal from '../modals/confirm_delete_modal';

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoutes();
  }

  render(){
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
          <input className="route-search-input" type="search" placeholder="Enter a keyword" />
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
              <th>Created</th>
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
          <li className="active-page-link">PREV</li>
          <li className="active-page-link">1</li>
          <li className="inactive-page-link">NEXT</li>
        </ul>

      </section>
    );
  }

  renderItems(){
    const items = this.props.routes.map((route, i)=>(
      <RouteIndexItem key={i}
        route={route}
        currentUser={this.props.currentUser}
        deleteRoute={this.props.deleteRoute}
        openModal={this.props.openModal} />
    ));

    return items;
  }
}

export default RouteIndex;
