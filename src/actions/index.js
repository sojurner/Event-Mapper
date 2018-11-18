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

export const setEventLocation = location => ({
  type: 'SET_EVENT_LOCATION',
  location
});

export const setWatchEvent = event => ({
  type: 'SET_WATCH_EVENT',
  event
});

export const removeFromWatchlist = event => ({
  type: 'REMOVE_FROM_WATCH_LIST',
  event
});
