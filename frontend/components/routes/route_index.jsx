import React from 'react';
import RouteIndexItem from './route_index_item';

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoutes();
  }

  render(){
    return (
      <section className="route-index-container">
        <h2>
          MY ROUTES
        </h2>

        <section className="search-and-sort">
          <input type="search" placeholder="Enter a keyword" />
          <button>SEARCH</button>
          <button>Reset</button>
          <select>
            <option>Most Recent</option>
            <option>Oldest</option>
            <option>Longest</option>
            <option>Shortest</option>
          </select>
        </section>

        <table className="route-index-table">
          <tbody className="route-index-tbody">
            <tr>
              <th>Route</th>
              <th>Created</th>
              <th>Distance</th>
              <th>Elevation</th>
              <th>Name</th>
              <th>City</th>
              <th>Privacy</th>
              <th>Options</th>
            </tr>

            {this.renderItems()}

          </tbody>
        </table>

        <ul className="paginator">
          <li className="active-page-link">PREV</li>
          <li className="active-page-link">1</li>
          <li className="inactive-page-link">NEXT</li>
        </ul>

      </section>
    );
  }

  renderItems(){
    const items = this.props.routes.map((route, i)=>(
      <RouteIndexItem key={i} route={route} />
    ));

    return items;
  }
}

export default RouteIndex;
