import { watchListReducer } from '../watchListReducer';
import * as mock from '../../data/mockEvents';

describe('Watch List reducer', () => {
  it('should return initial state', () => {
    const expected = [];

    const result = watchListReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should add to state when action type is ADD_TO_WATCH_LIST', () => {
    const expected = mock.eventsResponse;
    const actionBody = {
      type: 'ADD_TO_WATCH_LIST',
      event: mock.eventsResponse[1]
    };
    const result = watchListReducer([mock.eventsResponse[0]], actionBody);

    expect(result).toEqual(expected);
  });

  it('should remove from state when action typr id REMOVE_FROM_WATCH_LIST', () => {
    const expected = mock.eventsResponse[0];
    const actionBody = {
      type: 'REMOVE_FROM_WATCH_LIST',
      event: mock.eventsResponse[1]
    };

    const result = watchListReducer(mock.eventsResponse, actionBody);

    expect(result).toEqual([expected]);
  });
});
