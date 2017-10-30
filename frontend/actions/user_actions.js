export const RECEIVE_OTHER_USER = 'RECEIVE_OTHER_USER';

export const receiveOtherUser = (user) => {
  return {
    type: RECEIVE_OTHER_USER,
    user
  };
};

export const fetchOtherUser = (userId) => {
  
};
