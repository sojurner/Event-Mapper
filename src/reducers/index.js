import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import { eventsReducer } from './eventsReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  watchList: watchListReducer,
  events: eventsReducer
});

export default rootReducer;
