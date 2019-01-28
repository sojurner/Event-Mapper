import React from 'react';
import { shallow } from 'enzyme';
import { EventTabCard } from './EventTabCard';
import { eventsResponse, eventPages } from '../../data/mockEvents';

describe('EventTabCard', () => {
  let wrapper;
  let mockPopupDisplay;
  let mockMapCenter;
  let mockSetZoom;
  let mockSetEvent;
  let mockFavoriteClick;
  let mockEvents = eventsResponse;
  let mockScrollTarget = eventsResponse[0].e_id;

  beforeEach(() => {
    mockPopupDisplay = jest.fn();
    mockMapCenter = jest.fn();
    mockSetZoom = jest.fn();
    mockSetEvent = jest.fn();
    mockFavoriteClick = jest.fn();

    wrapper = shallow(
      <EventTabCard
        changePopupDisplay={mockPopupDisplay}
        setMapCenter={mockMapCenter}
        setZoom={mockSetZoom}
        setTargetEvent={mockSetEvent}
        events={mockEvents}
        eventScrollItem={mockScrollTarget}
        msgPrompt={``}
        handleFavoriteClick={mockFavoriteClick}
        eventPages={eventPages}
      />
    );
  });

  it('should match snap shot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
