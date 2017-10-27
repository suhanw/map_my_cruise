import React from 'react';
import {Link} from 'react-router-dom';
import RouteMap from './route_map';

class RouteIndexItem extends React.Component  {

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
        <td>plcholder for options</td>
      </tr>
    );
  }
}


export default RouteIndexItem;
