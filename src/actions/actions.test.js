import * as dispatch from './index.js';
import { mockStateUser } from '../data/mockUser';
import * as events from '../data/mockEvents';

describe('User Actions', () => {
  it('should return a type of LOGIN_USER', () => {
    const expected = {
      type: 'LOGIN_USER',
      user: mockStateUser
    };
    expect(dispatch.loginUser(mockStateUser)).toEqual(expected);
  });
});

describe('Watchlist actions', () => {
  it('should return a type of ADD_TO_WATCH_LIST', () => {
    const expected = {
      type: 'ADD_TO_WATCH_LIST',
      event: events.mockTargetEventTrue
    };

    expect(dispatch.addToWatchList(events.mockTargetEventTrue)).toEqual(
      expected
    );
  });

  it('should return a type of REMOVE_FROM_WATCH_LIST', () => {
    const expected = {
      type: 'REMOVE_FROM_WATCH_LIST',
      event: events.mockTargetEventFalse
    };

    expect(dispatch.removeFromWatchlist(events.mockTargetEventFalse)).toEqual(
      expected
    );
  });
});

describe('Event Actions', () => {
  it('should return a type pf SET_EVENTS', () => {
    const expected = {
      type: 'SET_EVENTS',
      events: events.eventsResponse
    };

    expect(dispatch.setEvents(events.eventsResponse)).toEqual(expected);
  });

  it('should return a type of SET_WATCH_EVENT', () => {
    const expected = {
      type: 'SET_WATCH_EVENT',
      event: events.mockTargetEventFalse
    };

    expect(dispatch.setWatchEvent(events.mockTargetEventFalse)).toEqual(
      expected
    );
  });
});
