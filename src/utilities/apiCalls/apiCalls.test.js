// import React from 'react';
import * as call from './apiCalls';
import * as events from '../../data/mockEvents';
import * as user from '../../data/mockUser';
import * as params from '../../data/mockUserParams';

describe('getEvents', () => {
  it('should call fetch with correct params', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.eventsResponse)
      });
    });

    call.getEvents(35, -105);
    expect(window.fetch).toHaveBeenCalledWith(params.getEvents);
  });
});

describe('postUser', () => {
  it('should call fetch with correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(user.mockUser)
      });
    });
    await call.postUser(user.mockStateUser);
    expect(window.fetch).toHaveBeenCalledWith(
      'https://event-mapper-api.herokuapp.com/api/v1/users',
      params.postUser
    );
  });
});

describe('setFavorite', () => {
  it('should call fetch with correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.favoriteEventResponse)
      });
    });
    await call.setFavorite();

    expect(window.fetch).toHaveBeenCalledWith(
      'https://event-mapper-api.herokuapp.com/api/v1/users/undefined/events',
      params.setFavorite
    );
  });
});
