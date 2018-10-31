import React from 'react';
import { WatchListCard } from './WatchListCard';

describe('WatchListCard', () => {
  let wrapper = shallow(<WatchListCard  />);
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
