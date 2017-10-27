import React from 'react';

class RouteMap extends React.Component {

  constructor(props) {
    super(props);

    this.renderPath = this.renderPath.bind(this);
  }

  componentWillMount(){
    // create Polyline object based on encoded polyline from DB
    const { polyline } = this.props.route;
    const routeCoords = google.maps.geometry.encoding.decodePath(polyline);
    this.routePolyline = new google.maps.Polyline({
      path: routeCoords,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
  }

  componentDidMount() {
    this.renderPath();
  }

  componentWillReceiveProps(newProps) {
    const newRouteId = newProps.route.id;
    if (newRouteId !== this.props.route.id) {
      this.renderPath();
    }
  }

  render() {
    // debugger
    // const mapClass = this.props.thumbnail ? 'route-thumbnail' : 'route-map';
    const mapId = this.props.thumbnail ? `route-thumbnail-${this.props.route.id}` : 'route-map';

    // <div className={mapClass} id="route-map">
    return (
      <div id={mapId}>
      </div>
    );
  }

  renderPath(){
    // Credit to find center of polyline:
    // https://stackoverflow.com/questions/3320925/google-maps-api-calculate-center-zoom-of-polyline
    const routePathCoords = this.routePolyline.getPath().getArray();
    const bounds = new google.maps.LatLngBounds();
    routePathCoords.forEach((coord)=>{
      bounds.extend(coord);
    });

    if (this.props.thumbnail){ //RENDER THUMBNAIL
      const thumbCtr = bounds.getCenter();
      const thumbCtrLat = thumbCtr.lat();
      const thumbCtrLng = thumbCtr.lng();

      const thumbPath = routePathCoords.map((coord)=>{
        return `${coord.lat()},${coord.lng()}`;
      }).join('|');

      let imgSrc = "https://maps.googleapis.com/maps/api/staticmap?";
      // imgSrc += `center=${thumbCtrLat},${thumbCtrLng}`;
      // imgSrc += "&zoom=13";
      imgSrc += "&visible";
      imgSrc += "&size=80x80";
      imgSrc += `&path=color:0xff0000ff|weight:1|${thumbPath}`;
      imgSrc += "&key=AIzaSyBikueOt0xpkbFjWOncTXfVj5HEg_pu8f8";
      // debugger

      const thumbnailDom = document.getElementById(`route-thumbnail-${this.props.route.id}`);
      thumbnailDom.style
        .background = `url(${imgSrc}) no-repeat left top`;
      thumbnailDom.style.height='80px';
      thumbnailDom.style.width='80px';

    } else { //RENDER FULL ROUTE MAP
      // create a Google map and wrap the mapDOMNode in a Google Map
      const mapOptions = {
        center: {lat: 0, lng: 0},
        zoom: 15,
      };
      this.map = new google.maps.Map(
        document.getElementById('route-map'),
        mapOptions
      );

      // render the Polyline
      this.routePolyline.setMap(this.map);

      // to center the map around the route
      this.map.fitBounds(bounds);
    }
  }
}

export default RouteMap;
