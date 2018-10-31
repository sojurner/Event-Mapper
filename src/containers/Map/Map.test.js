import React from 'react';

import { Map, mapDispatchToProps, mapStateToProps } from './Map';
import * as events from '../../data/mockEvents';
import { mockStore } from '../../data/mockStore';
import moment from 'moment';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

jest.mock('../../utilities/apiCalls/apiCalls');

describe('Map', () => {
  let wrapper;
  let mockLat;
  let mockLng;
  let mockSet;

  beforeEach(() => {
    mockLat = 35.2323;
    mockLng = -105.3434;
    mockSet = jest.fn();
    wrapper = shallow(
      <Map
        userLocation={{}}
        events={events.eventsResponse}
        setEvents={mockSet}
      />
    );
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call window.fetch with correct Params', () => {
    wrapper.instance().retrieveEvents();

    expect(mockSet).toHaveBeenCalled();
    expect(wrapper.state().latitude).toEqual();
    expect(wrapper.state().longitude).toEqual();
  });

  it('should fire setEvents when called in mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.setEvents();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should map to the store properly', () => {
    const mapped = mapStateToProps(mockStore);

    expect(mapped.userLocation).toEqual(mockStore.userLocation);
  });

  it('should change latitude and longitude coordinates if user location is not specified', () => {
    wrapper = shallow(
      <Map
        userLocation={{ latitude: 23, longitude: 42 }}
        events={events.eventsResponse}
        setEvents={mockSet}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
