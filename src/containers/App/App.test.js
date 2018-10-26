import React from 'react';

import { App, mapDispatchToProps } from './App';
import * as user from '../../data/mockUser';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('App', () => {
  let wrapper;
  let mockLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App loginUser={mockLogin} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when user is logged in', () => {
    wrapper.setState({ user: { name: 'paul' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.loginUser();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call postUser with correct Params', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(user.mockStateUser)
      })
    );

    wrapper.responseGoogle();
    expect(window.fetch).toHaveBeenCalledWith();
  });
});
