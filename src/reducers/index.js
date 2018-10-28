import { combineReducers } from 'redux';
import { userReducer, userLocationReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import { eventsReducer } from './eventsReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  userLocation: userLocationReducer,
  watchList: watchListReducer,
  events: eventsReducer
});

export default rootReducer;
