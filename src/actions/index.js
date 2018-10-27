export const loginUser = user => ({
  type: 'LOGIN_USER',
  user
});

export const addToWatchList = event => ({
  type: 'ADD_TO_WATCH_LIST',
  event
});

export const setEvents = events => ({
  type: 'SET_EVENTS',
  events
});

export const setWatchEvent = event => ({
  type: 'SET_WATCH_EVENT',
  event
});

export const removeFromWatchlist = event => ({
  type: 'REMOVE_FROM_WATCH_LIST',
  event
});
