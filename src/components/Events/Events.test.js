import React from 'react';
import { Events } from './Events';
import * as events from '../../data/mockEvents';
import * as user from '../../data/mockUser';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Marker: () => ({})
}));

describe('Events', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Events events={events.eventsResponse} activeUser={user.mockStateUser} />
    );
  });

  it('should matchSnapshot', () => {
    expect(shallow).toMatchSnapshot();
  });

  it('should setState of displayPopup when showEventInfo is called', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().showEventInfo(mockEvent, {});

    expect(wrapper.state().targetEvent).toEqual({});
    expect(wrapper.state().displayPopup).toEqual(true);
  });

  it('should setState of displayPopup when closePopup is called', () => {
    wrapper.instance().closePopup();

    expect(wrapper.state().displayPopup).toEqual(false);
  });

  it('should setState of displayModal when correct params are passed to handleModalClick', () => {});
});
