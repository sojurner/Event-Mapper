import React from 'react';
import Profile from './Profile';

describe('Profile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
