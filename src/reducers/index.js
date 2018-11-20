import { combineReducers } from 'redux';
import { userReducer, userLocationReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import {
  eventsReducer,
  eventTargetReducer,
  popupReducer
} from './eventsReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  userLocation: userLocationReducer,
  eventLocation: eventLocationReducer,
  watchList: watchListReducer,
  events: eventsReducer
});

export default rootReducer;
