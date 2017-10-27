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
        <span>
          <Link to="/routes">Back to My Routes</Link>
        </span>
        <h2>
          {route.name}
          {route.polyline}
        </h2>

        <RouteMap route={route} />
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
