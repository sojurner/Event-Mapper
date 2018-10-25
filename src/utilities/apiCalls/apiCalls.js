import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner, cleanedUser } from '../helpers/helpers';
import Geohash from 'latlon-geohash';

export const getEvents = async (lat, lng) => {
  const geoCode = Geohash.encode(lat, lng);

  const url = 'https://app.ticketmaster.com/discovery/v2/events.json?'+
    `apikey=${ticketMasterApiKey}&`+
    `geoPoint=${geoCode.slice(0, 9)}&`+
    'radius=50&'+
    'size=100';
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
  return await response.json();
};
