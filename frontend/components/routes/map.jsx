import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.renderInitMap = this.renderInitMap.bind(this);

    this.state = {
      loading: true,
    };

    this.startPos = undefined;
    this.endPos = undefined;

    this.handleMapClick = this.handleMapClick.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
    this.generatePath = this.generatePath.bind(this);
  }

  componentWillMount() {
    this.center = {
      lat: 34.030059,
      lng: -118.429283,
    };

    // get curr location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (currPos)=>{ //success callback
          this.center.lat = currPos.coords.latitude;
          this.center.lng = currPos.coords.longitude;
          this.setState({loading: false});
          this.renderInitMap(this.center);
        },
        (err) => { //error callback, when user disable location setting
          this.setState({loading: false});
          this.renderInitMap(this.center);
        }
      );
    }
  }

  componentDidMount() {

  }

  render() {

    if (this.state.loading) {
      return(
        <div>
          {this.renderLoading()}
        </div>
      );
    }

    return (
      <div id='map'>
      </div>
    );
  }

  renderInitMap(center){

    const mapOptions = { center: center, zoom: 15 };
    const mapDom = document.getElementById('map');
    this.map = new google.maps.Map(
      mapDom,
      mapOptions
    );

    // create and hook DirectionsRenderer to map...
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: document.getElementById('directions'), // to display directions
      preserveViewport: true, // to prevent the map from zooming into path
    });

    mapDom.style.width = this.props.width;
    mapDom.style.height = this.props.height;

    this.map.addListener('click', this.handleMapClick);
  }

  renderLoading(){
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  handleMapClick(event) {
    // alert(event.latLng);
    this.placeMarker(event.latLng);
  }

  placeMarker(latLng) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    if (!this.startPos) { // record start position
      this.startPos = marker;
    } else if (!this.endPos) { // record end position
      this.endPos = marker;
      this.generatePath();
    } else { // scenario where user wants intermediate points

    }
    // this.map.panTo(latLng);
  }

  generatePath() {
    let directionsService = new google.maps.DirectionsService();

    // initiate async request for directions betw 2 points
    let request = {
      origin: this.startPos.getPosition(),
      destination: this.endPos.getPosition(),
      travelMode: 'WALKING',
    };
    directionsService.route(
      request,
      (result, status) => {
        if (status === 'OK') {
          // directionsRenderer already hooked to map,
          // make it render the result.
          this.directionsRenderer.setDirections(result);

          // reset the markers
          this.startPos.setMap(null);
          this.endPos.setMap(null);
          this.startPos = undefined;
          this.endPos = undefined;

          // to get the polyline string
          const polyline = result.routes[0].overview_polyline;
          // send state back to RouteForm
          this.props.setPolyline(polyline);

        } else {
          alert(`Error: ${status}`);
        }
        // document.querySelector('.warnbox-content').innerHTML += ' Unless you are Tom Cruise.',
      }
    );

    // to update polyline as user drags the route
    this.directionsRenderer.addListener('directions_changed', ()=>{
      // 'this' is the DirectionsRenderer object
      const directionsResult = this.directionsRenderer.getDirections();
      const directionsRoute = directionsResult.routes[0];
      const newPolyline = directionsRoute.overview_polyline;
      this.props.setPolyline(newPolyline);
    });

  }
}

export default Map;
