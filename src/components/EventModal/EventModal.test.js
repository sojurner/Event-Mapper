import React from 'react';

import { EventModal } from './EventModal';
import * as events from '../../data/mockEvents';

describe('EventModal', () => {
  let wrapper;
  let mockFavoriteClick;
  let mockHandleHover;
  let mockMessage;

  beforeEach(() => {
    mockFavoriteClick = jest.fn();
    mockHandleHover = jest.fn();
    mockMessage = 'help me';
    wrapper = shallow(
      <EventModal
        targetEvent={events.mockTargetEventFalse}
        handleFavoriteClick={mockFavoriteClick}
        handleHover={mockHandleHover}
        hoverMessage={mockMessage}
      />
    );
  });

  it('should matchSnapshot when favorite is false', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should matchSnapshot when favorite is true', () => {
    wrapper = shallow(
      <EventModal
        targetEvent={events.mockTargetEventTrue}
        handleFavoriteClick={mockFavoriteClick}
        handleHover={mockHandleHover}
        hoverMessage={mockMessage}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleHover on mouse enter and mouse leave when favorite is false', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.find('i').simulate('mouseEnter', mockEvent);
    expect(mockHandleHover).toHaveBeenCalledWith(
      mockEvent,
      'Add to Watch-list'
    );

    wrapper.find('i').simulate('mouseLeave', mockEvent);

    expect(mockHandleHover).toHaveBeenCalledWith(mockEvent, '');
  });

  it('should call handleHover with correct params on mouse enter and mouse leave when favorite is true', () => {
    wrapper = shallow(
      <EventModal
        targetEvent={events.mockTargetEventTrue}
        handleFavoriteClick={mockFavoriteClick}
        handleHover={mockHandleHover}
        hoverMessage={mockMessage}
      />
    );
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.find('i').simulate('mouseEnter', mockEvent);
    expect(mockHandleHover).toHaveBeenCalledWith(
      mockEvent,
      'Remove from Watch-list'
    );

    wrapper.find('i').simulate('mouseLeave', mockEvent);
    expect(mockHandleHover).toHaveBeenCalledWith(mockEvent, '');
  });
});
