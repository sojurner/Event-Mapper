import React from 'react';
import { Events, mapDispatchToProps, mapStateToProps } from './Events';
import * as events from '../../data/mockEvents';
import * as user from '../../data/mockUser';
import { mockStore } from '../../data/mockStore';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Marker: () => ({})
}));

describe('Events', () => {
  let wrapper;
  let mockEvent;
  let mockFunction;

  beforeEach(() => {
    mockFunction = jest.fn();
    mockEvent = { preventDefault: jest.fn() };
    wrapper = shallow(
      <Events
        events={events.eventsResponse}
        watchList={events.eventsResponse}
        activeUser={user.mockStateUser}
        activeUser={user.mockStateUser}
        addToWatchList={mockFunction}
        removeFromWatchlist={mockFunction}
        setWatchEvent={mockFunction}
      />
    );
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should matchSnapshot when displayPopup is true', () => {
    wrapper.setState({ displayPopup: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should setState of displayPopup when showEventInfo is called', () => {
    wrapper.instance().showEventInfo(mockEvent, events.eventsResponse[0]);

    expect(wrapper.state().targetEvent).toEqual(events.eventsResponse[0]);
    expect(wrapper.state().displayPopup).toEqual(true);
  });

  it('should setState of displayPopup when closePopup is called', () => {
    wrapper.instance().closePopup();

    expect(wrapper.state().displayPopup).toEqual(false);
  });

  it('should map to store properly', () => {
    const mapped = mapStateToProps(mockStore);

    expect(mapped.activeUser).toEqual(mockStore.activeUser);
  });

  it('should call dispatch function when using a function from mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.addToWatchList();

    expect(mockDispatch).toHaveBeenCalled();

    mapped.removeFromWatchlist();

    expect(mockDispatch).toHaveBeenCalled();

    mapped.setWatchEvent();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should setState of displayModal when correct params are passed to handleModalClick', () => {
    wrapper.instance().handleModalClick(mockEvent, 'open');

    expect(wrapper.state().displayModal).toEqual(true);

    wrapper.instance().handleModalClick(mockEvent, 'close');

    expect(wrapper.state().displayModal).toEqual(false);
  });

  it('should setState of targetEvent.favorite to true if targetEvent.favorite is false ', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(events.favoriteEventResponse)
      });
    });
    wrapper.setState({ targetEvent: events.mockTargetEventFalse });

    await wrapper.instance().handleFavoriteClick();

    expect(wrapper.state().targetEvent.favorite).toEqual(true);
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should setState of targetEvent.favorite to false if targetEvent.favorite is false', async () => {
    const responseObj = {
      event: 'G5vzZ4C58cdb-',
      user: 1
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(responseObj)
      });
    });

    wrapper.setState({ targetEvent: events.eventsResponse[1] });

    await wrapper.instance().handleFavoriteClick();

    expect(wrapper.state().targetEvent.favorite).toEqual(false);
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should setState when handleHover is called', () => {
    wrapper.instance().handleHover(mockEvent, 'Add to Watchlist');

    expect(wrapper.state().hoverMessage).toEqual('Add to Watchlist');
  });

  it('should call handleModalClick on marker Click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleModalClick');
    wrapper.instance().forceUpdate();
    const marker = wrapper.find('i').first();
    marker.simulate('click', mockEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showEventInfo on mouse enter', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showEventInfo');
    wrapper.instance().forceUpdate();
    const marker = wrapper.find('i').first();
    marker.simulate('mouseEnter', mockEvent, events.mockTargetEventFalse);
    expect(spy).toHaveBeenCalled();
  });

  it('should call closePopup on mouse leave', () => {
    const spy = jest.spyOn(wrapper.instance(), 'closePopup');
    wrapper.instance().forceUpdate();
    const marker = wrapper.find('i').first();
    marker.simulate('mouseLeave');
    expect(spy).toHaveBeenCalled();
  });
});
