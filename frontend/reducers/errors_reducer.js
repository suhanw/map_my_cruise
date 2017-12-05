// {
//   entities: {...},
//   session: {...},
//   errors: {
//     session: [...],
//     otherErros: [...],
//   }
// }

import {combineReducers} from 'redux';
import SessionErrorsReducer from './session/session_errors_reducer';
import RouteErrorsReducer from './routes/route_errors_reducer';
import WorkoutErrorsReducer from './workouts/workout_errors_reducer';
import CommentErrorsReducer from './comments/comment_errors_reducer';
import FriendErrorsReducer from './friends/friend_errors_reducer';
import UserSearchErrorsReducer from './friends/user_search_errors_reducer';
import ActivityErrorsReducer from './activities/activity_errors_reducer';
import NotificationErrorsReducer from './notifications/notification_errors_reducer';

const ErrorsReducer = combineReducers({
  notifications: NotificationErrorsReducer,
  activities: ActivityErrorsReducer,
  session: SessionErrorsReducer,
  routes: RouteErrorsReducer,
  workouts: WorkoutErrorsReducer,
  comments: CommentErrorsReducer,
  friends: FriendErrorsReducer,
  user_search: UserSearchErrorsReducer,
});

export default ErrorsReducer;
