import React from 'react';
import {Link} from 'react-router-dom';
import RouteMap from '../routes/route_map';
import Spinner from '../spinner';
import {randomizer} from '../../util/randomizer';
import Modal from '../modals/modal';
import ConfirmDeleteModal from '../modals/confirm_delete_modal';

class ShowWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {

    const { workout, route, workoutCreator, routeCreator, loading } = this.props;
    const adGifClass = `ad-gif-${randomizer(3, 1)}`;

    if (this.props.errors.length > 0) {
      return (
        <section className='workout-show-container'>
          {this.props.errors.toString()}
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
      <section className="workout-show-container">

        <Modal modal={this.props.modal}
          component={ConfirmDeleteModal}
          closeModal={this.props.closeModal}
          dispatchAction={this.props.deleteWorkout}
          history={this.props.history} />

        <section className="workout-details">
          <section className="workout-data">
            <table>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <h2>
                      {workout.name}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <th className="fit">DISTANCE</th>
                  <th className="fit">DURATION</th>
                  <th className="fit">AVG PACE</th>
                  <th></th>
                </tr>
                <tr>
                  <td className="fit stats">
                    {route.distance}
                    <small>mi</small>
                  </td>
                  <td className="fit stats">{this.renderDuration(workout.duration)}</td>
                  <td className="fit stats">{this.renderDuration(workout.duration/route.distance)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td className="fit avatar">
                    <img src={workoutCreator.avatar_url} />
                  </td>
                  <td className="fit date">
                    <span>{workout.created_at}</span>
                    <span>
                      {'by '}
                      <div className="username">
                        {`${workoutCreator.fname} ${workoutCreator.lname}`}
                      </div>
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table className="workout-show-buttons">
              <tbody>
                <tr>
                  <td>
                    <Link to={`/workouts/${workout.id}/edit`} className="orange-button">EDIT</Link>
                    <button onClick={this.handleDelete} className="orange-button">DELETE</button>
                    <Link className="workout-index-link" to="/workouts">Back to My Workouts</Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <figure className="workout-map-box">
              <RouteMap route={route} />
              <figcaption>
                <small>
                  VIEW ROUTE <Link to={`/routes/${route.id}`}>{route.name}</Link>
                </small>
                <small>
                  Mapped {route.created_at} by {`${routeCreator.fname} ${routeCreator.lname}`}.
                </small>
              </figcaption>
            </figure>
          </section>
          <section className="comments-likes">
            <div className="likes">
              This will be likes
            </div>
            <div className="comments">
              This will be comments
            </div>
          </section>
        </section>

        <aside className="workout-show-sidebar">
          <div className={adGifClass}>
            <small>Ad</small>
            <small>Rent this movie somewhere near you.</small>
          </div>
        </aside>
      </section>
    );
  }

  componentDidMount() {
    const workoutId = this.props.match.params.workoutId;
    this.props.fetchWorkout(workoutId);
  }

  renderDuration(duration) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 3600 % 60);

    return ('0' + h).slice(-2) + ":" +
    ('0' + m).slice(-2) + ":" +
    ('0' + s).slice(-2);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.openModal({confirmDeleteWorkout: this.props.workout.id});
  }
}

export default ShowWorkout;
