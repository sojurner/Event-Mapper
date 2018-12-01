import { combineReducers } from 'redux';
import { userReducer, userLocationReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import {
  eventsReducer,
  eventTargetReducer,
  popupReducer
} from './eventsReducer';
import { mapZoomReducer, mapDisplayReducer } from './mapReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  userLocation: userLocationReducer,
  targetEvent: eventTargetReducer,
  displayPopup: popupReducer,
  watchList: watchListReducer,
  events: eventsReducer,
  zoom: mapZoomReducer,
  fullMapDisplay: mapDisplayReducer
});

export default rootReducer;
