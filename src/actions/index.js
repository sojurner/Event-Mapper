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

export const setEvents = (events, page) => ({
  type: 'SET_EVENTS',
  events,
  page
});

export const setEventPageInfo = info => ({
  type: 'SET_EVENT_PAGE_INFO',
  info
});

export const setCurrentEventPage = page => ({
  type: 'SET_CURRENT_EVENT_PAGE',
  page
});

export const setWatchEvent = (event, page) => ({
  type: 'SET_WATCH_EVENT',
  event,
  page
});

export const setEventLinkInfo = links => ({
  type: 'SET_EVENT_LINK_INFO',
  links
});

export const setTargetEvent = event => ({
  type: 'SET_TARGET_EVENT',
  event
});

export const resetEvents = () => ({
  type: 'RESET_EVENTS'
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
