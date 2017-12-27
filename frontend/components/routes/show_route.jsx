import React from 'react';
import {Link, Route} from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import RouteMap from './route_map';
import Spinner from '../spinner';
import {randomizer} from '../../util/randomizer';
import LikeIndex from '../likes/like_index';
import ResourceNotFound from '../resource_not_found';

class ShowRoute extends React.Component {
  constructor(props) {
    super(props);

    this.renderLikes = this.renderLikes.bind(this);
    this.renderRouteOptions = this.renderRouteOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const adGifClass = `ad-gif-${randomizer(3, 1)}`;
    const { route, user, loading } = this.props;

    if (this.props.errors.length > 0) {
      return (
        <section className='route-show-container'>
          <ResourceNotFound errors={this.props.errors.toString()}/>
        </section>
      );
    }

    if (loading) {
      return (
        <div className="spinner-box">
          <Spinner />;
        </div>
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
                <td>{`${user.fname} ${user.lname} (${user.email})`}</td>
              </tr>
            </tbody>
          </table>
          <section className="route-map-box">
            <RouteMap route={route} />
          </section>
          <section className="route-comments-likes">
            <h2>COMMENTS AND LIKES</h2>
            {this.renderLikes()}
          </section>
        </section>

        <aside className="route-sidebar">
          <div className={adGifClass}>
            <small>Ad</small>
            <small>Rent this movie somewhere near you.</small>
          </div>
          {this.renderRouteOptions()}
        </aside>
      </section>
    );
  }

  renderLikes() {
    debugger
    return (
      <LikeIndex
        fetchLikable={this.props.fetchRoute}
        likableLikes={this.props.route.likes}
        likableType="routes"
        likableId={this.props.route.id} />
    );
  }

  renderRouteOptions() {
    let optionsDom;
    if (this.props.route.user === this.props.currentUser.id) {
      optionsDom = (
        <section className="route-shortcut-buttons">
          <Link to="/routes/create" className="create-route-button">CREATE A ROUTE</Link>
          <Link to={`/routes/${this.props.route.id}/edit`} className="edit-route-button">EDIT ROUTE</Link>
          <button type="button" className="delete-route-button" onClick={this.handleClick}>DELETE ROUTE</button>
          <Link to="/workouts/create" className="log-workout-button">LOG THIS WORKOUT</Link>
          <Link to="/routes">Back to My Routes</Link>
        </section>
      );
    } else {
      optionsDom = (
        <section className="route-shortcut-buttons">
          <Link to="/routes">Back to My Routes</Link>
        </section>
      );
    }
    return optionsDom;
  }

  handleClick(e) {
    e.preventDefault();
    const {route: {id}} = this.props;
    this.props.deleteRoute(id).then(
      () => this.props.history.push(`/routes`)
    );
  }
}

export default ShowRoute;
