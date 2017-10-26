import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
// export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

// export const clearErrors = () => {
//   return (dispatch) => {
//     return dispatch({
//       type: CLEAR_ERRORS,
//     });
//   };
// };

export const signup = (user)=>{
  return (dispatch) => {
    return SessionApiUtil.signup(user).then(
      (newUser) => dispatch(receiveUser(newUser)),
      (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
    );
  };
};

export const login = (user)=>{
  return (dispatch) => {
    return SessionApiUtil.login(user).then(
      (currUser) => dispatch(receiveUser(currUser)),
      (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
    );
  };
};

export const logout = ()=>{
  return (dispatch) => {
    return SessionApiUtil.logout().then(
      (currUser) => dispatch(receiveUser(null)),
      (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
    );
  };
};

export const editProfile = (formData) => {
  return (dispatch) => {
    return SessionApiUtil.editProfile(formData).then(
      (currUser) => dispatch(receiveUser(currUser)),
      (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
    );
  };
};
