import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner, cleanedUser } from '../helpers/helpers';
import moment from 'moment';
import Geohash from 'latlon-geohash';

export const getEvents = async (lat, lng) => {
  const geoCode = Geohash.encode(lat, lng);
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&geoPoint=${geoCode.slice(
    0,
    9
  )}&onSaleEndDateTime=${moment.utc()}&size=200`;
  const response = await fetch(url);
  const cleanedEvents = eventsCleaner(await response.json());
  return cleanedEvents;
};

export const postUser = async userInfo => {
  const activeUser = await cleanedUser(userInfo);
  const url = 'https://event-mapper-api.herokuapp.com/api/v1/users';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(activeUser),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  return result;
};

export const setFavorite = async (user, event, id) => {
  console.log(user);
  console.log(event);
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${id}/events`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ event: event, user: user }),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  return result;
};

export const removeFavorite = async favoriteInfo => {
  const url = 'https:// event-mapper-api.herokuapp.com/api/v1/';
};
