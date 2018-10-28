import React from 'react';

import { Map } from './Map';
import * as events from '../../data/mockEvents';
import moment from 'moment';

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
        events={events.eventsResponse}
        setEvents={jest.fn()}
      />
    );
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call window.fetch with correct Params', () => {
    navigator.geolocation = {
      getCurrentPosition: () => {
        return { location: { coords: { latitude: 23, longitude: -104 } } };
      }
    };

    wrapper.instance().setLatLngEvents();

    expect(wrapper.state().latitude).toEqual(0);
    expect(wrapper.state().longitude).toEqual(0);
  });

  it('should retrieve events', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.mockEventsResponse)
      });
    });

    wrapper.instance().retrieveEvents(35, -103);

    expect(window.fetch).toHaveBeenCalled();
  });
});
