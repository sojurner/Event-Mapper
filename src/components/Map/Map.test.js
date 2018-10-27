import React from 'react';

import { Map } from './Map';
import Events from '../Events/Events';
import * as mock from '../../data/mockEvents';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('Map', () => {
  let wrapper;
  let mockLat;
  let mockLng;

  beforeEach(() => {
    mockLat = 35.2323;
    mockLng = -105.3434;
    wrapper = shallow(
      <Map
        latitude={mockLat}
        longitude={mockLng}
        events={mock.eventsResponse}
      />
    );
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call window.fetch with correct Params', async () => {
    navigator.geolocation = { getCurrentPosition: () => jest.fn() };

    await wrapper.instance().setLatLngEvents();

    expect(wrapper.state().latitude).toEqual(0);
    expect(wrapper.state().longitude).toEqual(0);
  });

  it('should retrieve events', () => {});
});
