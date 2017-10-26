import React from 'react';
import {Link} from 'react-router-dom';

const Splash = () => (
  <main>
    <section className="splash-image">
      <h1>MAKE EVERY MILE COUNT, JOIN FREE TODAY</h1>
      <p>
        You pound the pavement, we provide the motivation. Plan each stride and
        learn from every route with MapMyRun.
      </p>
      <span className="splash-signup-buttons">
        <Link to="/signup"
          className="splash-signup-demo">LOG IN WITH DEMO</Link>
        <Link to="/signup"
          className="splash-signup-email">SIGN UP WITH EMAIL</Link>
      </span>
    </section>

    <section className="splash-icons">
      <ul>
        <li>
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <h2>
            MAP YOUR ROUTE
          </h2>
          <p>
            Know where you're going, see where you've been. We have over 70 million routes to chose from - or be bold and create your own.
          </p>
          <Link to="/routes">
            Check it out
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <i class="fa fa-podcast" aria-hidden="true"></i>
          <h2>
            TRACK YOUR ACTIVITY
          </h2>
          <p>
            Record activity with our mobile apps, import data from third-party devices, enter workouts manually and never miss a beat.
          </p>
          <Link to="/workouts">
            Check it out
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <i class="fa fa-users" aria-hidden="true"></i>
          <h2>
            SHARE WITH FRIENDS
          </h2>
          <p>
            Add a social twist to your exercise routine. Get extra encouragement, cheer on your buddies or start a little friendly competition.
          </p>
          <Link to="/friends">
            Check it out
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <i class="fa fa-imdb" aria-hidden="true"></i>
          <h2>
            WATCH TC MOVIES
          </h2>
          <p>
            Can't get enough of Tom Cruise running? Check out his entire filmography.
          </p>
          <a target="_blank" href="http://www.imdb.com/name/nm0000129/?ref_=tt_ov_st_sm">
            Check it out
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </section>
  </main>
);

export default Splash;
