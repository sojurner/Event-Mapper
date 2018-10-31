import * as call from './apiCalls';
import * as events from '../../data/mockEvents';
import * as user from '../../data/mockUser';
import * as params from '../../data/mockUserParams';

jest.mock('moment/src/moment', () => ({
  moment: () => ({})
}));

describe.skip('getEvents', () => {
  it('should call fetch with correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.eventsResponse)
      });
    });

    await call.getEvents(35, -105);
    expect(window.fetch).toHaveBeenCalledWith();
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

describe('removeFromWatchlist', () => {
  it('should call fetch with correct params', () => {
    const responseObj = {
      event: 'G5vzZ4C58cdb-',
      user: 1
    };
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(responseObj)
      });
    });

    call.removeFromWatchlist();
    expect(window.fetch).toHaveBeenCalledWith(
      params.removeEvent,
      params.removeEventOptions
    );
  });
});

describe('getUserWatchList', () => {
  it('should get user watchlist on click', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.userWatchlist)
      });
    });
    call.getUserWatchlist();
    expect(window.fetch).toHaveBeenCalledWith(
      'https://event-mapper-api.herokuapp.com/api/v1/users/undefined/events'
    );
  });
});

describe('getWeather', () => {
  it('should retrieve weather data', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            icon: 'sunny',
            high: 45,
            low: 30,
            conditions: 'cloudy'
          })
      });
    });

    call.getEventWeather();

    expect(window.fetch).toHaveBeenCalledWith(
      'https://event-mapper-weather.herokuapp.com/api/v1/weather?lat=undefined&lng=undefined&date=undefined'
    );
  });
});
