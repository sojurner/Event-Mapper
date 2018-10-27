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
