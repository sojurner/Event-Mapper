import React from 'react';
import { EventNavigation } from './EventNavigation';
import { shallow } from 'enzyme';
import * as mock from './mockdata';

describe('EventNavigation', () => {
  let wrapper;
  let setCurrentmock;
  let setEventMock;
  let setEventLinkMock;
  let setPageMock;
  beforeEach(() => {
    setCurrentmock = jest.fn();
    setEventMock = jest.fn();
    setEventLinkMock = jest.fn();
    setPageMock = jest.fn();
    wrapper = shallow(
      <EventNavigation
        eventPages={mock.mockEventPages}
        eventLinks={mock.mockEventLinks}
        events={mock.mockEvents}
        setCurrentEventPage={setCurrentmock}
        setEvents={setEventMock}
        setEventLinkInfo={setEventLinkMock}
        setEventPageInfo={setPageMock}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when current page is not 0', () => {
    wrapper.setState({ currentPage: 1 });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when current page is last page', () => {
    wrapper.setState({ currentPage: 8 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should setState on component did mount', () => {
    expect(wrapper.state()).toEqual({
      currentPage: 0,
      pagesToShow: [0, 1, 2, 3, 4],
      totalPages: [0, 1, 2, 3, 4]
    });
  });

  it('should handle page change when current page is less than 4', () => {
    wrapper.instance().handlePageChange(2);
    expect(wrapper.state().pagesToShow).toEqual([0, 1, 2, 3, 4]);
  });

  it('should handle page change when current page is greater than 4', () => {
    wrapper.instance().handlePageChange(4);
    expect(wrapper.state().pagesToShow).toEqual([2, 3, 4]);
  });

  it('should not fetch new events if the event page exists in store', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    await wrapper.instance().getEventsByPage(mockEvent, 0);
    expect(setCurrentmock).toHaveBeenCalledWith(0);
  });

  it('should fetch new events if the event page does not exist in the store', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mock.mockEventFetchResults)
      });
    });

    const mockEvent = { preventDefault: jest.fn() };
    await wrapper.instance().getEventsByPage(mockEvent, 1);

    expect(window.fetch).toHaveBeenCalledWith(
      'https://app.ticketmaster.com/discover1&.com&apikey=undefined'
    );
  });

  it('should dispatch proper actions when dispatch method is called', () => {
    wrapper.instance().dispatchEventActions(mock.mockEventFetchResults);
    expect(setEventMock).toHaveBeenCalled();
    expect(setEventLinkMock).toHaveBeenCalled();
    expect(setPageMock).toHaveBeenCalled();
  });

  it('should call getEventsByPage and handlePagechange on back arrow event click', () => {
    const mockEvent = { preventDefault: jest.fn() };

    const spy1 = jest.spyOn(wrapper.instance(), 'getEventsByPage');
    const spy2 = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().forceUpdate();
    const backBtn = wrapper.find('i').first();
    backBtn.simulate('click', mockEvent, 1);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call getEventsByPage and handlePagechange on page content event click', () => {
    const mockEvent = { preventDefault: jest.fn() };

    const spy1 = jest.spyOn(wrapper.instance(), 'getEventsByPage');
    const spy2 = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().forceUpdate();

    const pageNum = wrapper.find('span').first();

    pageNum.simulate('click', mockEvent, 0);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call getEventsByPage and handlePagechange on forward arrow event click', () => {
    const mockEvent = { preventDefault: jest.fn() };

    const spy1 = jest.spyOn(wrapper.instance(), 'getEventsByPage');
    const spy2 = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.instance().forceUpdate();
    const backBtn = wrapper.find('i').last();
    backBtn.simulate('click', mockEvent, 1);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
