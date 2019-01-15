import { combineReducers } from 'redux';
import { userReducer, userLocationReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import {
  eventsReducer,
  eventsPageReducer,
  eventsLinkReducer,
  eventTargetReducer,
  popupReducer
} from './eventsReducer';
import {
  mapZoomReducer,
  mapDisplayReducer,
  mapCenterReducer
} from './mapReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  userLocation: userLocationReducer,
  targetEvent: eventTargetReducer,
  eventPages: eventsPageReducer,
  eventLinks: eventsLinkReducer,
  displayPopup: popupReducer,
  watchList: watchListReducer,
  mapCenter: mapCenterReducer,
  events: eventsReducer,
  zoom: mapZoomReducer,
  fullMapDisplay: mapDisplayReducer
});

export default rootReducer;
