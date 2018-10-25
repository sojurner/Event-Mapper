import * as moment from 'moment';

export const eventsCleaner = events => {
  console.log(events);
  const parsedEvent = events._embedded.events.map(event => {
    const venues = event._embedded.venues.map(venue => {
      const { latitude, longitude } = venue.location;
      return {
        name: venue.name,
        address: `${venue.address.line1} ${venue.city.name}, ${
          venue.state.stateCode
        } ${venue.postalCode}`,
        lat: latitude,
        lng: longitude
      };
    });

    return {
      name: event.name,
      url: event.url,
      img: event.images[0].url,
      date: moment(event.dates.start.dateTime).format('llll'),
      venues: venues
    };
  });

  return { events: parsedEvent, page: events.page.totalPages };
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
