export const loginUser = user => ({
  type: 'LOGIN_USER',
  user
});

export const setUserLocation = coordinates => ({
  type: 'SET_USER_LOCATION',
  coordinates
});

export const setWatchList = events => ({
  type: 'SET_WATCH_LIST',
  events
});

export const addToWatchList = event => ({
  type: 'ADD_TO_WATCH_LIST',
  event
});

export const setEvents = events => ({
  type: 'SET_EVENTS',
  events
});

export const setEventPageInfo = info => ({
  type: 'SET_EVENT_PAGE_INFO',
  info
});

export const setWatchEvent = event => ({
  type: 'SET_WATCH_EVENT',
  event
});

export const setEventLinkInfo = links => ({
  type: 'SET_EVENT_LINK_INFO',
  links
});

export const setTargetEvent = event => ({
  type: 'SET_TARGET_EVENT',
  event
});

export const removeFromWatchlist = event => ({
  type: 'REMOVE_FROM_WATCH_LIST',
  event
});

export const changePopupDisplay = bool => ({
  type: 'CHANGE_DISPLAY_POPUP',
  bool
});

export const setZoom = zoomVal => ({
  type: 'SET_ZOOM',
  zoomVal
});

export const setMapDisplay = () => ({
  type: 'SET_MAP_DISPLAY'
});

export const setMapCenter = coords => ({
  type: 'SET_MAP_CENTER',
  coords
});
