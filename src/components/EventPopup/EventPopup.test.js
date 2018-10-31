import React from 'react';
import { EventPopup } from './EventPopup';
import {
  mockTargetEventFalse,
  mockTargetEventFalseTwo
} from '../../data/mockEvents';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('EventPopup', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventPopup targetEvent={mockTargetEventFalse} />);
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should mathSnapshot if the name is longer than 38 characters', () => {
    wrapper = shallow(<EventPopup targetEvent={mockTargetEventFalseTwo} />);
    expect(wrapper).toMatchSnapshot();
  });
});
