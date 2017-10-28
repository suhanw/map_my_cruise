import React from 'react';
import {Link} from 'react-router-dom';
import RouteMap from './route_map';

class RouteIndexItem extends React.Component  {

  constructor(props) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
        <tr>
          <td>
            <Link to={`/routes/${this.props.route.id}`}>
              <RouteMap route={this.props.route} thumbnail />
            </Link>
          </td>
          <td>{this.props.route.created_at}</td>
          <td>{this.props.route.distance}</td>
          <td>{this.props.route.elevation}</td>
          <td>{this.props.route.name}</td>
          <td>{this.props.route.city}</td>
          <td>{this.props.route.privacy}</td>
          <td>{this.renderOptions()}</td>
        </tr>
    );
  }

  renderOptions() {
    if (this.props.route.user_id === this.props.currentUser.id) {
      return (
        <div className="route-index-item-options">
          <Link to={`routes/${this.props.route.id}/edit`}>Edit</Link>
          <button onClick={()=>{
              this.props.openModal({confirmDeleteRoute: this.props.route.id});
            }}>Delete</button>
        </div>
      );
    } else { //to implement viewing other users' routes

    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteRoute(this.props.route.id);
  }
}


export default RouteIndexItem;
