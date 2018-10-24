export const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return null;
    default:
      return state;
  }
};