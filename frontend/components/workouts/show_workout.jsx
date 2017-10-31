import React from 'react';
import {Link} from 'react-router-dom';
import RouteMap from '../routes/route_map';
import Spinner from '../spinner';

class ShowWorkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { workout, route, user, loading } = this.props;

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
                    <img src={user.avatar_url} />
                  </td>
                  <td className="fit date">
                    <span>{workout.created_at}</span>
                    <span>
                      {'by '}
                      <div className="username">
                        {`${user.fname} ${user.lname}`}
                      </div>
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table className="workout-show-buttons">
              <tr>
                <td>
                  <Link to={`/workouts/${workout.id}/edit`}>EDIT</Link>
                  <button>DELETE</button>
                </td>
              </tr>
            </table>
            <figure className="route-map-box">
              <RouteMap route={route} />
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

        <aside className="workout-sidebar">
          This will be ad.
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
}

export default ShowWorkout;
