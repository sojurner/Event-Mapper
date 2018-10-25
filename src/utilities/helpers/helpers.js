import * as moment from 'moment';

export const eventsCleaner = events => {
  console.log(events);
  const parsedEvent = events._embedded.events.map(event => {
    const { name, id, url, images, dates } = event;
    const { venues } = event._embedded;

    return {
      name: name,
      id: id,
      url: url,
      img: images[0].url,
      date: moment(dates.start.dateTime).format('llll'),
      venue_name: venues[0].name,
      address: `${venues[0].address.line1} ${venues[0].city.name}, ${
        venues[0].state.stateCode
      } ${venues[0].postalCode}`,
      lat: venues[0].location.latitude,
      lng: venues[0].location.longitude,
      distance: venues[0].distance,
      favorite: false
    };
  });

  return parsedEvent;
};

export const cleanedUser = userInfo => {
  const { email, familyName, givenName, googleId } = userInfo;
  return {
    user: {
      google_id: googleId,
      given_name: givenName,
      family_name: familyName,
      email: email
    }
  };
};
