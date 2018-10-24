export const eventsCleaner = (events) => {
  const eventsArray = events._embedded.events;
  return eventsArray;
}