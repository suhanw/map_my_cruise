import {connect} from 'react-redux';
import RouteForm from './route_form';
import {createRoute} from '../../actions/routes_actions';

const mapStateToProps = (state)=>{
};

const mapDispatchToProps = (dispatch)=>{
  return {
    createRoute: (route) => dispatch(createRoute(route))
  };
};

export default connect
  (null, mapDispatchToProps)
  (RouteForm);
  // (mapStateToProps, mapDispatchToProps)
