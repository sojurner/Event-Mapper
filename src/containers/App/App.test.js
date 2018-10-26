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
});
