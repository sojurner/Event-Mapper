import { eventsReducer } from '../eventsReducer';
import * as mock from '../../data/mockEvents';

describe('Set Events', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = eventsReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the events response when action type is SET_EVENTS', () => {
    let expected = mock.eventsResponse;
    let actionBody = { type: 'SET_EVENTS', events: mock.eventsResponse };
    const result = eventsReducer([], actionBody);

    expect(result).toEqual(expected);
  });

  it('should return the events with the target event favorite property switched', () => {
    let actionBody = { type: 'SET_WATCH_EVENT', event: mock.eventsResponse[1] };
    const result = eventsReducer(mock.eventsResponse, actionBody);
    expect(result).toEqual(mock.eventStoreResponse);
  });
});
