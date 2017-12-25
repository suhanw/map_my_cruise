import React from 'react';
import {Link} from 'react-router-dom';
import RouteMap from '../routes/route_map';
import Spinner from '../spinner';
import {randomizer} from '../../util/randomizer';
import Modal from '../modals/modal';
import ConfirmDeleteModal from '../modals/confirm_delete_modal';
import CommentIndexContainer from '../comments/comment_index_container';
import LikeIndex from '../likes/like_index';
import ResourceNotFound from '../resource_not_found';

class ShowWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.renderLikes = this.renderLikes.bind(this);
    this.renderWorkoutOptions = this.renderWorkoutOptions.bind(this);
  }

  render() {

    const { workout, route, workoutCreator, routeCreator, loading } = this.props;
    const adGifClass = `ad-gif-${randomizer(3, 1)}`;

    if (this.props.errors.length > 0) {
      return (
        <section className='workout-show-container'>
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
                  {this.renderWorkoutOptions()}

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
          <section className="workout-comments-likes">
            <h2>COMMENTS AND LIKES</h2>

            {this.renderLikes()}
            {this.renderComments()}

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

  componentWillReceiveProps(newProps) {
    const newWorkoutId = newProps.match.params.workoutId;
    if (newWorkoutId !== this.props.match.params.workoutId) {
      this.props.fetchWorkout(newWorkoutId);
    }
  }

  renderDuration(duration) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 3600 % 60);

    return ('0' + h).slice(-2) + ":" +
    ('0' + m).slice(-2) + ":" +
    ('0' + s).slice(-2);
  }

  renderComments() {
    return (
      <CommentIndexContainer workoutId={this.props.workout.id} />
    );
  }

  renderLikes() {
    return (
      <LikeIndex likableLikes={this.props.workout.likes} />
    );
  }

  renderWorkoutOptions() {
    let optionsDom;
    if (this.props.workoutCreator.id === this.props.currentUser.id) {
      optionsDom = (
        <td>
          <Link to={`/workouts/${this.props.workout.id}/edit`} className="orange-button">EDIT</Link>
          <button onClick={this.handleDelete} className="orange-button">DELETE</button>
          <Link className="workout-index-link" to="/workouts">Back to My Workouts</Link>
        </td>
      )
    } else {
      optionsDom = (
        <td>
          <Link className="workout-index-link" to="/workouts">Back to My Workouts</Link>
        </td>
      );
    }

    return optionsDom;
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.openModal({confirmDeleteWorkout: this.props.workout.id});
  }
}

export default ShowWorkout;
