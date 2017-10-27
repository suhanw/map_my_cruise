import React from 'react';
import Map from './map';

class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    // debugger

    this.state = {
      name: '',
      polyline: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveRoute = this.saveRoute.bind(this);
    this.setPolyline = this.setPolyline.bind(this);
  }

  render(){

    return (
      <section id="route-form-container">
        <form className="route-form-details">
          {this.renderSearchBar()}
          {this.renderFormInput()}
          <div id="directions"></div>
        </form>
        <Map className="map"
          width="100%"
          height="80vh"
          setPolyline={this.setPolyline}/>
      </section>
    );
  }

  renderSearchBar() {
    return (
      <section className="route-form-map-search">
        <h3>Choose map location</h3>
        <input type="search" placeholder="Enter location" />
        <button>
          SEARCH
        </button>
      </section>
    );
  }

  renderFormInput() {
    return (
      <section className="route-form-input">
        <h3>Route Details</h3>
        <input type="text" placeholder="Name this map"
          onChange={this.handleChange} />
        <button onClick={this.saveRoute}>
          SAVE ROUTE
        </button>
      </section>
    );
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  saveRoute(e) {
    e.preventDefault();
    this.props.createRoute(this.state).then(
      ({route})=> {
        this.props.history.push(`/routes/${route.id}`);
      }
    );
  }

  setPolyline(polyline) {
    this.setState({polyline});
  }
}

export default RouteForm;
