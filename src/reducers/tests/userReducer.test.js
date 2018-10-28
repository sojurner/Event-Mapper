import { userReducer } from '../userReducer';
import * as mock from '../../data/mockUser';

describe('Login user', () => {
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
