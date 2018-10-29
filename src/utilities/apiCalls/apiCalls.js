import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner, cleanedUser } from '../helpers/helpers';
import Geohash from 'latlon-geohash';

export const getEvents = async (lat, lng) => {
  const geoCode = await Geohash.encode(lat, lng);
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?` +
    `apikey=${ticketMasterApiKey}&` +
    `geoPoint=${geoCode.slice(0, 9)}&` +
    `radius=50&size=200`;
  const response = await fetch(url);
  const result = await response.json();
  const cleanedEvents = eventsCleaner(result);
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
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${id}/events`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ event: event, user: user }),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  return result;
};

export const removeFromWatchlist = async (userId, eventId) => {
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${userId}/events/${eventId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  return result;
};

export const getUserWatchlist = async userId => {
  const url = `https://event-mapper-api.herokuapp.com/api/v1/users/${userId}/events`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
