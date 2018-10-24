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
        address: venue.address.line1,
        lat: latitude,
        lng: longitude
      };
    });

    return {
      name: event.name,
      classifications: classifications,
      url: event.url,
      img: event.images[0].url,
      date: event.dates.start.dateTime,
      venues: venues
    };
  });

  return parsedEvent;
};
