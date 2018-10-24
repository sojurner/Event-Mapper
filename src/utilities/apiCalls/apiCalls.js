import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner } from '../helpers/helpers';

export const getEvents = async (location, radius) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&geoPoint=9xj64fk3s`;
  const response = await fetch(url);
  const cleanedEvents = eventsCleaner(await response.json());
  return cleanedEvents;
};
