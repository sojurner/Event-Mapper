import { userReducer, userLocationReducer } from '../userReducer';
import * as mock from '../../data/mockUser';

describe('UserReducer', () => {
  it('should return initial state', () => {
    let expected = {};
    const result = userReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the user if action type is LOGIN_USER', () => {
    const expected = mock.mockStateUser;
    const actionBody = { type: 'LOGIN_USER', user: mock.mockStateUser };
    const result = userReducer({}, actionBody);

    expect(result).toEqual(expected);
  });
});

describe('userLocationReducer', () => {
  it('should return initial state', () => {
    let expected = {};
    const result = userLocationReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the coordinates object if type is SET_USER_LOCATION', () => {
    const expected = { latitude: 123, longitude: 953 };

    const actionBody = {
      type: 'SET_USER_LOCATION',
      coordinates: { latitude: 123, longitude: 953 }
    };
    const result = userLocationReducer({}, actionBody);

    expect(result).toEqual(expected);
  });
});
