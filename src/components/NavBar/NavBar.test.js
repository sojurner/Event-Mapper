import React from 'react';

import * as user from '../../data/mockUser';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar activeUser={user.mockStateUser} />);
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
