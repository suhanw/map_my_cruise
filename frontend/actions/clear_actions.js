export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLEAR_ENTITIES = 'CLEAR_ENTITIES';


export const clearErrors = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_ERRORS,
    });
  };
};


export const clearEntities = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_ENTITIES,
    });
  };
};
