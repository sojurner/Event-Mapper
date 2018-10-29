import * as user from './mockUser';
import * as events from './mockEvents';

export const mockStore = {
  activeUser: user.mockStateUser,
  userLocation: { latitude: 39.43243, longitude: -104.98434 },
  watchList: events.userWatchlist,
  events: events.eventsResponse
};
