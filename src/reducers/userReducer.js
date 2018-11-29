export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;

    default:
      return state;
  }
};

export const userLocationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return action.coordinates;

    default:
      return state;
  }
};
