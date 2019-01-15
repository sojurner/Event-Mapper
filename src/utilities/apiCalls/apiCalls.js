import {
  eventsCleaner,
  cleanedUser,
  cleanEventImages
} from '../helpers/helpers';
import * as moment from 'moment';
import Geohash from 'latlon-geohash';

export const getEvents = async (lat, lng) => {
  const geoCode = Geohash.encode(lat, lng).slice(0, 9);
  const unixSeven = moment()
    .add(30, 'days')
    .utc()
    .format();
  const url =
    'https://app.ticketmaster.com/discovery/v2/events.json?' +
    `apikey=${process.env.REACT_APP_TICKET_MASTER_API_KEY}&` +
    `geoPoint=${geoCode}&` +
    `endDateTime=${unixSeven}&` +
    'radius=30&' +
    'size=20';
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const result = await response.json();
      return eventsCleaner(result);
    }
  } catch (error) {
    return { error };
  }
};

export const getEventsByDate = async (lat, lng, start, end) => {
  const geoCode = Geohash.encode(lat, lng).slice(0, 9);
  const url =
    'https://app.ticketmaster.com/discovery/v2/events.json?' +
    `apikey=${process.env.REACT_APP_TICKET_MASTER_API_KEY}&` +
    `geoPoint=${geoCode}&` +
    `startDateTime=${start}&` +
    `endDateTime=${end}&` +
    'radius=30&' +
    'size=20';
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const result = await response.json();
      return eventsCleaner(result);
    }
  } catch (error) {
    return { error };
  }
};

export const getEventsByPage = async url => {
  url = `https://app.ticketmaster.com/${url}&apikey=${
    process.env.REACT_APP_TICKET_MASTER_API_KEY
  }`;
  return eventsCleaner(await (await fetch(url)).json());
};

export const getEventImages = async id => {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}/images?apikey=${
    process.env.REACT_APP_TICKET_MASTER_API_KEY
  }`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const result = await response.json();
      return cleanEventImages(result.images);
    }
  } catch (error) {
    return { error };
  }
};

export const postUser = async userInfo => {
  const activeUser = cleanedUser(userInfo);
  const url = 'https://event-mapper-api.herokuapp.com/api/v1/users';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(activeUser),
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const setFavorite = async (user, event, id) => {
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${id}/events`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ event: event, user: user }),
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const removeFromWatchlist = async (userId, eventId) => {
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${userId}/events/${eventId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const getUserWatchlist = async userId => {
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${userId}/events`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const getEventWeather = async (lat, lng, unix) => {
  const url =
    `https://event-mapper-weather.herokuapp.com/api/v1/weather?lat=${lat}` +
    `&lng=${lng}` +
    `&date=${unix}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { error };
  }
};
