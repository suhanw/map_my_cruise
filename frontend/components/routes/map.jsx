import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.renderInitMap = this.renderInitMap.bind(this);

    this.state = {
      loading: true,
    };
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

    mapDom.style.width = "500px";
    mapDom.style.height = "500px";

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
