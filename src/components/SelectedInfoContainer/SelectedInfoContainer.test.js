import React from 'react';

import { SelectedInfoContainer } from './SelectedInfoContainer';
import * as events from '../../data/mockEvents';

describe('SelectedInfoContainer', () => {
  let wrapper;
  let mockRemove;

  beforeEach(() => {
    mockRemove = jest.fn();
    wrapper = shallow(
      <SelectedInfoContainer
        removeEvent={mockRemove}
        item={events.mockTargetEventFalse}
        weather={{ icon: 'cloudy' }}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call removeEvent onClick', () => {
    wrapper.find('button').simulate('click');

    expect(mockRemove).toHaveBeenCalled();
  });
});
