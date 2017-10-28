import React from 'react';
import {fetchCity} from '../../util/routes_api_util';

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

        } else {
          // alert(`Error: ${status}`);
          this.props.receiveRouteErrors(['Dude, that route is impossible, mission-wise.']);
          this.props.openModal('errors');
        }
      }
    );

    // to update polyline as user creates a new route, or drags the route
    this.directionsRenderer.addListener('directions_changed', ()=>{
      // 'this' is the DirectionsRenderer object
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
}

export default Map;
