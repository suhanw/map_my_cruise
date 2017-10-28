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
    this.handleSearch = this.handleSearch.bind(this);
    this.saveRoute = this.saveRoute.bind(this);
    this.setPolyline = this.setPolyline.bind(this);
  }

  componentDidMount() {
    document.getElementById("directions").addEventListener('DOMSubtreeModified', ()=>{
      const warnbox = document.querySelector(".warnbox-content");

      if (!warnbox.innerHTML.includes('Tom Cruise') && Boolean(warnbox.innerHTML.length)) {
        document.querySelector(".warnbox-content").innerHTML += ' <b>Unless of course you are Tom Cruise running to save the world.</b>';
      }

      return;
    });
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
          height="100vh"
          setPolyline={this.setPolyline}/>
      </section>
    );
  }

  renderSearchBar() {
    return (
      <section className="route-form-map-search">
        <h3>Choose map location</h3>
        <input type="search" placeholder="Enter location" />
        <button onClick={this.handleSearch}>
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

  handleSearch(e) {
    e.preventDefault();
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
