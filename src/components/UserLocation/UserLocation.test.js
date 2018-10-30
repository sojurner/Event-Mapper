import React from 'react';

import { UserLocation } from './UserLocation';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('User Location', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserLocation />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
