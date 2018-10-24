export const eventsCleaner = events => {
  const parsedEvent = events._embedded.events.map(event => {
    const classifications = event.classifications.map(classification => {
      return {
        segment: classification.segment.name,
        genre: classification.genre.name
      };
    });
};