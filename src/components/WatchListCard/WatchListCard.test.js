import React from 'react';

import { WatchListCard } from './WatchListCard';
import * as events from '../../data/mockEvents';

describe('WatchListCard', () => {
  let wrapper;
  let mockHandle;

  beforeEach(() => {
    mockHandle = jest.fn();
    wrapper = shallow(
      <WatchListCard
        handleSelection={mockHandle}
        item={events.mockTargetEventFalse}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should call handleSelection on click', () => {
    wrapper.find('.watch-list-card-container').simulate('click');

    expect(mockHandle).toHaveBeenCalled();
  });
});
