import React from 'react';

import { FilterBar, mapDispatchToProps } from './FilterBar';
import * as suggest from './mockFilterData';
import * as mock from '../../data/mockEvents';

jest.mock('../../utilities/apiCalls/apiCalls');

describe('FilterBar', () => {
  let wrapper;
  let mockFunction;

  beforeEach(() => {
    mockFunction = jest.fn();
    wrapper = shallow(
      <FilterBar setUserLocation={mockFunction} setEvents={mockFunction} />
    );
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should setState of location and suggestions when update value is called', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: { value: 'east las' }
    };
    wrapper.instance().updateValue(mockEvent);
    expect(wrapper.state().location).toEqual('east las');
    expect(wrapper.state().suggestions).toEqual(suggest.mocksuggestions);
    expect(wrapper.state().cursor).toEqual(0);
  });

  it('should return the proper string when escapeRegexCharacters is called with a string', () => {
    let result = wrapper.instance().escapeRegexCharacters('LAS VEGAS');
    expect(result).toEqual('LAS VEGAS');
  });

  it('should return an array of suggestions when getSuggestions is called', () => {
    const result = wrapper.instance().getSuggestions('east las');
    expect(result).toEqual(suggest.mocksuggestions);
  });

  it('should return the suggestion when getSuggestionValue is called', () => {
    const result = wrapper.instance().getSuggestionValue('east las vegas');
    expect(result).toEqual('east las vegas');
  });

  describe('handleKeyDown', () => {
    it('should decrement state of cursor when the event.keycode is 38', () => {
      const mockEvent = { keyCode: 38 };

      wrapper.setState({ cursor: 4 });
      wrapper.instance().handleKeyDown(mockEvent);

      expect(wrapper.state().cursor).toEqual(3);
    });

    it('should increment state of cursor when the event.keycode is 40', () => {
      const mockEvent = { keyCode: 40 };

      wrapper.setState({ cursor: 1, suggestions: [2, 3, 4] });
      wrapper.instance().handleKeyDown(mockEvent);

      expect(wrapper.state().cursor).toEqual(2);

      wrapper.setState({ cursor: 1, suggestions: [] });
      wrapper.instance().handleKeyDown(mockEvent);

      expect(wrapper.state().cursor).toEqual(1);
    });

    it.skip('should  state of cursor when event.keycode is 13', () => {
      const mockEvent = { preventDefault: jest.fn(), keyCode: 13 };

      wrapper.instance().handleKeyDown(mockEvent);

      wrapper.setState({ cursor: 1, suggestions: [] });
      wrapper.instance().handleKeyDown(mockEvent);

      expect(wrapper.state().cursor).toEqual(1);
    });
  });

  describe('resetState', () => {
    it('should set state of lat and lng', () => {
      wrapper.instance().resetState(35, -135);
      expect(wrapper.state().location).toEqual('');
      expect(wrapper.state().suggestions).toEqual([]);
    });
  });

  describe('mapDispatch to props', () => {
    it('should fire an action from dispatch', () => {
      let mockDispatch = jest.fn();
      let mapped = mapDispatchToProps(mockDispatch);
      mapped.setUserLocation();
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('should fire an action from dispatch', () => {
      let mockDispatch = jest.fn();
      let mapped = mapDispatchToProps(mockDispatch);
      mapped.setEvents();
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('should call updateValue on change of input field', () => {
      const mockEvent = { preventDefault: jest.fn(), target: { value: 'wer' } };
      const spy = jest.spyOn(wrapper.instance(), 'updateValue');

      wrapper.instance().forceUpdate();

      const marker = wrapper.find('input');

      marker.simulate('change', mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should call handleKeyDown on keydown', () => {
      const mockEvent = { preventDefault: jest.fn(), keyCode: 2 };

      const spy = jest.spyOn(wrapper.instance(), 'handleKeyDown');
      wrapper.instance().forceUpdate();

      const keyCode = wrapper.find('input');

      keyCode.simulate('keyDown', mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should call resetState on click', () => {
      wrapper.setState({ suggestions: mock.eventsResponse, location: 'dss' });

      const spy = jest.spyOn(wrapper.instance(), 'resetState');
      wrapper.instance().forceUpdate();
      const suggestion = wrapper.find('.suggestion').first();

      suggestion.simulate('click', 35, 105);

      expect(spy).toHaveBeenCalled();
    });
  });
});
