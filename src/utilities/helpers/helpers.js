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