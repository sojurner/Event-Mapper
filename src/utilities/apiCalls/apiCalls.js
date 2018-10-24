import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner } from '../helpers/helpers';
import Geohash from 'latlon-geohash';

export const getEvents = async (lat, lng) => {
  const geoCode = Geohash.encode(lat, lng);

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&geoPoint=${geoCode.slice(
    0,
    9
  )}&radius=100&size=50`;
  const response = await fetch(url);
  const cleanedEvents = eventsCleaner(await response.json());
  return cleanedEvents;
};
