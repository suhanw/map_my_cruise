// {
//   entities: {...},
//   session: {...},
//   errors: {
//     session: [...],
//     otherErros: [...],
//   }
// }

import {combineReducers} from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import RouteErrorsReducer from './route_errors_reducer';


const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  routes: RouteErrorsReducer,
});

export default ErrorsReducer;
