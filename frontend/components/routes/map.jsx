import React from 'react';
import {fetchCity} from '../../util/routes_api_util';
import Spinner from '../spinner';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.renderInitMap = this.renderInitMap.bind(this);

    this.state = {
      loading: true,
    };

    this.startPos = null;
    this.endPos = null;

    this.handleMapClick = this.handleMapClick.bind(this);
    this.placeMarker = this.placeMarker.bind(this);
    this.generatePath = this.generatePath.bind(this);
    this.renderPath = this.renderPath.bind(this);
  }

  componentDidMount(){
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

  componentWillReceiveProps(newProps){
    this.routePath = google.maps.geometry.encoding.decodePath(newProps.route.polyline);
  }

  renderCursorTooltip() {
    let cursorToolTip = document.getElementById('cursor-tooltip');
    window.onmousemove = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      cursorToolTip.style.top = `${y+10}px`;
      cursorToolTip.style.left = `${x+10}px`;
    };
  }

  render() {
    if (this.state.loading) {
      return(
        <div className="spinner-box">
          <Spinner />;
        </div>
      );
    }

    return (
        <div id='map'>
        </div>
    );
  }

  renderInitMap(center){
    const mapOptions = {
      center: center,
      zoom: 15,
      draggableCursor: "crosshair"
    };
    const mapDom = document.getElementById('map');
    this.map = new google.maps.Map(
      mapDom,
      mapOptions
    );

    // to allow user to add markers
    this.map.addListener('click', this.handleMapClick);

    // create and hook DirectionsRenderer to map
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: document.getElementById('directions'), // to display directions
      preserveViewport: true, // to prevent the map from zooming into path
    });

    // to render existing route for edit form
    if (this.props.formType === 'edit') {
      // pass in the intermediate points between origin and destination
      // as waypoints. Google only allows 23 free waypoints, inc. origin and dest.
      const lastIdx = this.routePath.length < 23 ? this.routePath.length-1 : 22;
      const waypoints = this.routePath.slice(1, lastIdx).map((point)=>{
        return {
          location: point,
          stopover: false,
        };
      });
      let request = {
        origin: this.routePath[0],
        destination: this.routePath[this.routePath.length-1],
        waypoints: waypoints,
        travelMode: 'WALKING',
      };

      this.generatePath(request);

      // // Credit to find center of polyline:
      // // https://stackoverflow.com/questions/3320925/google-maps-api-calculate-center-zoom-of-polyline
      const bounds = new google.maps.LatLngBounds();
      this.routePath.forEach((coord)=>{
        bounds.extend(coord);
      });
      this.map.fitBounds(bounds);
    }

  }

  handleMapClick(event) {
    this.placeMarker(event.latLng);
  }

  placeMarker(latLng) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    if (!this.startPos) { // record start position
      this.startPos = marker;
    } else if (!this.endPos) { // record end position and generate path
      this.endPos = marker;
      let request = {
        origin: this.startPos.getPosition(),
        destination: this.endPos.getPosition(),
        travelMode: 'WALKING',
      };
      this.generatePath(request);
      // reset the markers
      this.startPos.setMap(null);
      this.endPos.setMap(null);
      this.startPos = null;
      this.endPos = null;
    }
    // this.map.panTo(latLng);
  }

  generatePath(request) {
    let directionsService = new google.maps.DirectionsService();

    // initiate async request for directions betw 2 points
    directionsService.route(
      request,
      this.renderPath //if successful, render path
    );

    // to update polyline as user creates a new route, or drags the route
    this.directionsRenderer.addListener('directions_changed', ()=>{
      const directionsResult = this.directionsRenderer.getDirections();
      const directionsRoute = directionsResult.routes[0];
      const newPolyline = directionsRoute.overview_polyline;
      const newDistance = directionsRoute.legs[0].distance.text;
      const originLat = directionsResult.request.origin.location.lat();
      const originLng = directionsResult.request.origin.location.lng();
      const latLng = `${originLat},${originLng}`;

      fetchCity(latLng).then(
        (res) => {
          if (res.status === 'OK') {
            let newCity = res.results[0].formatted_address;
            // send state back to RouteForm
            this.props.setRouteState({
              polyline: newPolyline,
              distance: newDistance,
              city: newCity,
            });
          } else {
            this.props.receiveRouteErrors([res.error_message]);
            this.props.openModal('errors');
          }
        }
      );
    });
  }

  renderPath(result, status) {
    if (status === 'OK') {
      this.directionsRenderer.setDirections(result);
    } else {
      this.props.receiveRouteErrors(['Dude, that route is impossible, mission-wise.']);
      this.props.openModal('errors');
    }
  }

  renderLoading(){
    return (
      <h2>
        Loading...
      </h2>
    );
  }
}

export default Map;
