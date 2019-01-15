import * as moment from 'moment';

export const eventsCleaner = events => {
  const { page, _links, _embedded } = events;
  if (!_embedded) return [];
  const parsedEvent = _embedded.events.map((event, index) => {
    const { name, id, url, images, dates } = event;
    const { venues } = event._embedded;
    const lat =
      parseFloat(venues[0].location.latitude) + 0.0002 * Math.random();
    const lng =
      parseFloat(venues[0].location.longitude) + 0.0008 * Math.random();
    return {
      name,
      e_id: id,
      url: url,
      img: images[2].url,
      date: moment(dates.start.dateTime).format('llll'),
      unix: dates.start.dateTime,
      venue_name: venues[0].name,
      address: `${venues[0].address.line1} ${venues[0].city.name}, ${
        venues[0].state.stateCode
      } ${venues[0].postalCode}`,
      lat,
      lng,
      distance: venues[0].distance,
      favorite: false
    };
  });
  return {
    pageInfo: {
      count: page.totalElements,
      pages: page.totalPages,
      current: page.number
    },
    linkInfo: {
      next: _links.next.href,
      first: _links.first.href,
      last: _links.last.href
    },
    events: parsedEvent
  };
};

export const cleanedUser = userInfo => {
  const { email, familyName, givenName, googleId, imageUrl } = userInfo;
  return {
    user: {
      google_id: googleId,
      given_name: givenName,
      family_name: familyName,
      email,
      imageUrl
    }
  };
};

export const eventServerCleaner = (user, event) => {
  const { first_name, last_name, gid, email } = user;
  const userObj = {
    given_name: first_name,
    family_name: last_name,
    google_id: gid,
    email
  };
  const eventObj = { ...event };
  delete eventObj.favorite;
  return { userObj, eventObj };
};

export const cleanEventImages = images => {
  return images.sort((a, b) => b.width - a.width)[0];
};
