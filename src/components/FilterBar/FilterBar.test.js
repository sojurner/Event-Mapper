import React from 'react';

import { FilterBar } from './FilterBar';
import * as suggest from './mockFilterData';

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
});
