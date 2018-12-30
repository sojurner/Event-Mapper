export const mapZoomReducer = (state = [12], action) => {
  switch (action.type) {
    case 'SET_ZOOM':
      return action.zoomVal;
    default:
      return state;
  }
};

export const mapCenterReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MAP_CENTER':
      return [action.coords.longitude, action.coords.latitude];
    default:
      return state;
  }
};

export const mapDisplayReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_MAP_DISPLAY':
      return !state;
    default:
      return state;
  }
};
