import React from 'react';
import { EventPopup } from './EventPopup';
import { mockTargetEventFalse } from '../../data/mockEvents';

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
});
