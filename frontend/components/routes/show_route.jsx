import React from 'react';
import {Link, Route} from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import RouteMap from './route_map';

class ShowRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const routeId = this.props.match.params.routeId;
    this.props.fetchRoute(routeId);
  }

  componentWillReceiveProps(newProps) {
    const newRouteId = newProps.match.params.routeId;
    if (newRouteId !== this.props.match.params.routeId) {
      this.props.fetchRoute(newRouteId);
    }
  }

  render() {
    const { route, loading } = this.props;

    if (this.props.errors.length > 0) {
      return (
        <section className='route-show-container'>
          {this.props.errors.toString()}
        </section>
      );
    }

    if (loading) {
      return (
        <section className='route-show-container'>
          {this.renderLoading()}
        </section>
      );
    }

    return (
      <section className='route-show-container'>
        <h2 className="route-name">
          {route.name}
        </h2>
        <section className="route-details">
          <div className="route-distance">
            <small>DISTANCE</small>
            <strong>{route.distance}</strong>
            <small>miles</small>
          </div>
          <table className="route-body">
            <tbody>
              <tr>
                <th>BEGINS IN: </th>
                <td>{route.city}</td>
              </tr>
              <tr>
                <th>CREATED BY: </th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <section className="route-map-box">
            <RouteMap route={route} />
          </section>
        </section>

        <aside className="route-sidebar">
          <section className="route-shortcut-buttons">
            <Link to="/routes/create" className="create-route-button">CREATE A ROUTE</Link>
            <Link to="/workouts/create" className="log-workout-button">LOG THIS WORKOUT</Link>
            <Link to="/routes">Back to My Routes</Link>
          </section>
        </aside>
      </section>
    );
  }

  renderLoading() {
    return (
      <h2>
        Loading
      </h2>
    );
  }

}

export default ShowRoute;
