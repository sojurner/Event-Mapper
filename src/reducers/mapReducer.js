export const mapReducer = (state = [12], action) => {
  switch (action.type) {
    case 'SET_ZOOM':
      return action.zoomVal;
    default:
      return state;
  }
};
