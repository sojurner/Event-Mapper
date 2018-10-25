import * as moment from 'moment';

export const eventsCleaner = events => {
  const parsedEvent = events._embedded.events.map(event => {
    const classifications = event.classifications.map(classification => {
      return {
        segment: classification.segment.name,
        genre: classification.genre.name
      };
    });

    const venues = event._embedded.venues.map(venue => {
      const { latitude, longitude } = venue.location;
      return {
        name: venue.name,
        address: `${venue.address.line1} ${venue.city.name}, 
        ${venue.state.stateCode} ${venue.postalCode}`,
        lat: latitude,
        lng: longitude
      };
    });

    return {
      name: event.name,
      classifications: classifications,
      url: event.url,
      img: event.images[0].url,
      date: moment(event.dates.start.dateTime).format('llll'),
      venues: venues
    };
  });
  return parsedEvent;
};

export const cleanedUser = (userInfo) => {
  const { email, familyName, givenName, googleId } = userInfo;
  return { user:{
    google_id: googleId,
    given_name: givenName,
    family_name: familyName,
    email: email
  }
  };
};
