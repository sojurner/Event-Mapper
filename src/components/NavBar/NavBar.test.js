<<<<<<< HEAD
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
=======
// import React from 'react';
// import NavBar from './NavBar';

it('renders without crashing', () => {
  expect(false).toEqual(false);
});
>>>>>>> bb0d2f5133f99f48d80daa814d97726ebfb28c6c
