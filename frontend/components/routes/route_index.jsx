import React from 'react';
import {Link} from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import Modal from '../modals/modal';
import ConfirmDeleteModal from '../modals/confirm_delete_modal';
import Spinner from '../spinner';

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoutes().then(
      () => {
        this.setState({loading: false});
      }
    );
  }

  render(){
    if (this.state.loading) {
      return (
        <div className="spinner-box">
          <Spinner />;
        </div>
      );
    }

    if (!(this.props.routes.ordered_ids.length)) {
      return (
        <section className="route-index-container">
          <div className="route-index-header">
            <h2>
              MY ROUTES
            </h2>
            <Link to="routes/create" className="orange-button">CREATE A ROUTE</Link>
          </div>
          <span className="message">
            You have no routes, lazy bum. Plan some routes!
            Click <Link to="/routes/create">here</Link> to create a new route.
            <img src="https://media.giphy.com/media/2AbTBqALqk2MU/giphy.gif" className="gif"/>
          </span>
        </section>
      );
    }

    return (
      <section className="route-index-container">
        <Modal modal={this.props.modal}
          component={ConfirmDeleteModal}
          closeModal={this.props.closeModal}
          dispatchAction={this.props.deleteRoute}
          history={this.props.history} />
        <div className="route-index-header">
          <h2>
            MY ROUTES
          </h2>
          <Link to="routes/create" className="orange-button">CREATE A ROUTE</Link>
        </div>

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
