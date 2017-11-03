import React from 'react';
import Map from './map';
import Modal from '../modals/modal';
import FormErrorModal from '../modals/form_error_modal';

class RouteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.route;
    this.state['panelCollapsed'] = false;
    this.state['panelClass'] = "route-form-details";


    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveRoute = this.saveRoute.bind(this);
    this.setRouteState = this.setRouteState.bind(this);
    this.renderCursorTooltip = this.renderCursorTooltip.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.renderToggler = this.renderToggler.bind(this);
  }


  componentDidMount() {
    if (this.props.formType === 'edit') {
      const that = this;
      this.props.fetchRoute(this.props.match.params.routeId).then(
        () => {
          this.setState(that.props.route);
        },
        () => this.props.openModal('errors')
      );
    }

    document.getElementById("directions").addEventListener('DOMSubtreeModified', ()=>{
      const warnbox = document.querySelector(".warnbox-content");

      if (!warnbox.innerHTML.includes('Tom Cruise') && Boolean(warnbox.innerHTML.length)) {
        warnbox.innerHTML += ' <b>Unless of course you are Tom Cruise running to save the world.</b>';
        const tcGif = document.createElement('img');
        tcGif.setAttribute('src', 'https://media.giphy.com/media/5nPodXMLXXd1m/giphy.gif');
        warnbox.appendChild(tcGif);
      }

      return;
    });

    this.renderCursorTooltip();
  }

  renderCursorTooltip() {
    let cursorToolTip = document.getElementById('cursor-tooltip');
    window.onmousemove = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      cursorToolTip.style.top = `${y+10}px`;
      cursorToolTip.style.left = `${x+10}px`;

      if (this.state.polyline !== '') {
        // cursorToolTip.style.visibility = "hidden";
        cursorToolTip.innerHTML = "Click along any point on the route and drag to modify the route.";
      }
    };
  }

  render(){

    return (
      <section id="route-form-container">

        <div id="cursor-tooltip">
          Click on 2 points (start and end) to map a route.
        </div>

        <Modal modal={this.props.modal}
          errors = {this.props.errors}
          component={FormErrorModal}
          closeModal={this.props.closeModal} />

        <form className={this.state.panelClass}>

          {this.renderToggler()}

          {this.renderSearchBar()}
          {this.renderFormInput()}
          <div id="directions"></div>
        </form>
        <Map className="map"
          setRouteState={this.setRouteState}
          openModal={this.props.openModal}
          receiveRouteErrors={this.props.receiveRouteErrors}
          formType={this.props.formType}
          route={this.props.route} />
      </section>
    );
  }

  renderSearchBar() {
    return (
      <section className="route-form-map-search">
        <h3>Choose map location</h3>
        <input type="search" placeholder="Coming soon" />
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
          onChange={this.handleChange}
          value={this.state.name} />
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
    this.props.action(this.state).then(
      ({payload})=> {
        this.props.history.push(`/routes/${Object.keys(payload.routes_by_id)[0]}`);
      },
      () => {
        this.props.openModal('errors');
      }
    );
  }

  setRouteState(newState) {
    this.setState({
      polyline: newState.polyline,
      distance: newState.distance,
      city: newState.city,
    });
  }

  renderToggler() {
    let toggleIcon = (this.state.panelCollapsed ?
    <i className="fa fa-caret-up" aria-hidden="true"></i> :
    <i className="fa fa-caret-down" aria-hidden="true"></i> );

    return (
      <div className="panel-toggler"
        onClick={this.togglePanel}>
        {toggleIcon}
      </div>
    );
  }

  togglePanel() {
    if (this.state.panelCollapsed) {
      this.setState({
        panelCollapsed: false,
        panelClass: "route-form-details",
      });
    } else {
      this.setState({
        panelCollapsed: true,
        panelClass: "route-form-details collapse",
      });
    }
  }
}

export default RouteForm;
