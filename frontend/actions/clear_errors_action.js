export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const clearErrors = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_ERRORS,
    });
  };
};
