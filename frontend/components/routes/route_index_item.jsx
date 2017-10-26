import React from 'react';

class RouteIndexItem extends React.Component  {


  render() {
    return (
      <tr>
        <td>placeholder for map</td>
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
