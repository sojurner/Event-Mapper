import { ticketMasterApiKey } from './apiKeys';
import { eventsCleaner, cleanedUser } from '../helpers/helpers';

export const getEvents = async (location, radius) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&geoPoint=9xj64fk3s`;
  const response = await fetch(url);
  const cleanedEvents = eventsCleaner(await response.json());
  return cleanedEvents;
};

export const postUser = async (userInfo) => {
  const activeUser = await cleanedUser(userInfo);
  console.log(activeUser);
  
  const url = 'https://event-mapper-api.herokuapp.com/api/v1/users';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(activeUser),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
};