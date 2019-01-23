import { combineReducers } from 'redux';
import { userReducer, userLocationReducer } from './userReducer';
import { watchListReducer } from './watchListReducer';
import {
  eventsReducer,
  eventsPageReducer,
  eventsLinkReducer,
  eventTargetReducer,
  popupReducer,
  eventScrollReducer
} from './eventsReducer';
import {
  mapZoomReducer,
  mapDisplayReducer,
  mapCenterReducer
} from './mapReducer';
import { modalReducer } from './modalReducer';

const rootReducer = combineReducers({
  activeUser: userReducer,
  userLocation: userLocationReducer,
  targetEvent: eventTargetReducer,
  eventScrollItem: eventScrollReducer,
  eventPages: eventsPageReducer,
  eventLinks: eventsLinkReducer,
  events: eventsReducer,
  watchList: watchListReducer,
  displayPopup: popupReducer,
  mapCenter: mapCenterReducer,
  zoom: mapZoomReducer,
  displayModal: modalReducer,
  fullMapDisplay: mapDisplayReducer
});

export default rootReducer;
