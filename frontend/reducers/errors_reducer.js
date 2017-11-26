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
import RouteErrorsReducer from './routes/route_errors_reducer';
import WorkoutErrorsReducer from './workouts/workout_errors_reducer';
import CommentErrorsReducer from './comment_errors_reducer';
import FriendErrorsReducer from './friends/friend_errors_reducer';
import UserSearchErrorsReducer from './user_search_errors_reducer';
import ActivityErrorsReducer from './activity_errors_reducer';

const ErrorsReducer = combineReducers({
  activities: ActivityErrorsReducer,
  session: SessionErrorsReducer,
  routes: RouteErrorsReducer,
  workouts: WorkoutErrorsReducer,
  comments: CommentErrorsReducer,
  friends: FriendErrorsReducer,
  user_search: UserSearchErrorsReducer,
});

export default ErrorsReducer;
