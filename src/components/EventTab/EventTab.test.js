import React from 'react';

import { EventTab, mapStateToProps } from './EventTab';
import '../../data/mockEvents';
import * as events from '../../data/mockEvents';
import { mockStore } from '../../data/mockStore';
import { exact } from 'prop-types';

describe(EventTab, () => {
  let wrapper;
  let mockClose;
  let mockShow;
  let mockHandle;

  beforeEach(() => {
    mockClose = jest.fn();
    mockShow = jest.fn();
    mockHandle = jest.fn();
    wrapper = shallow(
      <EventTab
        showEventInfo={mockShow}
        closePopup={mockClose}
        handleModalClick={mockHandle}
        events={events.eventsResponse}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map to the store properly', () => {
    const expected = mockStore.events;

    const mapped = mapStateToProps(mockStore);

    expect(mapped.events).toEqual(expected);
  });

  it('should call showEventInfo on mouse enter', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper
      .find('.tab-card')
      .first()
      .simulate('mouseEnter', mockEvent, events.mockTargetEventFalse);

    expect(mockShow).toHaveBeenCalledWith(mockEvent, events.eventsResponse[0]);
  });

  it('should call closePopup on mouse leave', () => {
    wrapper
      .find('.tab-card')
      .first()
      .simulate('mouseLeave');

    expect(mockClose).toHaveBeenCalled();
  });

  it('should call handleModalClick on click', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper
      .find('.tab-card')
      .first()
      .simulate('click', mockEvent);

    expect(mockHandle).toHaveBeenCalledWith(mockEvent, 'open');
  });
});
