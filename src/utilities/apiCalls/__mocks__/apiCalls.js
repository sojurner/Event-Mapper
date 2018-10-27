import * as events from '../../../data/mockEvents';
import * as user from '../../../data/mockUser';

export const getEvents = async (lat, lng) => {
  return await new Promise(resolve => {
    return resolve({
      json: () => Promise.resolve(events.eventsResponse)
    });
  });
};

export const postUser = async info => {
  return await new Promise(resolve => {
    return resolve({
      json: () => Promise.resolve(user.mockStateUser)
    });
  });
};

export const setFavorites = async () => {
  return await new Promise(resolve => {
    return resolve({
      json: () => Promise.resolve(events.favoriteEventResponse)
    });
  });
};

// export const removeFavorite
