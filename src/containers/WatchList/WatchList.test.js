import React from 'react';

import { WatchList } from './WatchList';
import { mockStateUser } from '../../data/mockUser';
import { eventStoreResponse } from '../../data/mockEvents';

jest.mock('../../utilities/apiCalls/apiCalls');

describe('WatchList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WatchList activeUser={mockStateUser} watchlist={eventStoreResponse} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    wrapper.setState({ currentItem: 1, weather: 'sunny' });
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should setState of userWatchList on CDM', async () => {
    await wrapper.instance().getUserWatchlist();

    expect(wrapper.state().userWatchList).toEqual();
  });

  it.skip('should setState of displayInfo and currentItem if selected Item matches the currentItem state', () => {
    wrapper.setState({ currentItem: 1 });

    wrapper.instance().handleSelection({ id: 2 });

    expect(wrapper.state().displayInfo).toEqual({ id: 2 });
  });
});
