export const responseGoogle1 =
  'https://event-mapper-api.herokuapp.com/api/v1/users';

export const responseGoogle2 = {
  body:
    '{"user":{"google_id":"117977763637801404146","given_name":"Paul","family_name":"K","email":"pykim0591@gmail.com"}}',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST'
};

export const getEvents =
  'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GddBLHQGZLJjPNWsNxOrYRAoBx8Hdqrf&geoPoint=9wjr4et3f&radius=200&size=100';

export const postUser = {
  body: '{"user":{"email":"pykim0591@gmail.com"}}',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST'
};

export const setFavorite = {
  body: '{}',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST'
};

export const removeEvent =
  'https://event-mapper-api.herokuapp.com/api/v1/users/undefined/events/undefined';

export const removeEventOptions = {
  headers: { 'Content-Type': 'application/json' },
  method: 'DELETE'
};
