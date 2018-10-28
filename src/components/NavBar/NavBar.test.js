import React from 'react';

import * as user from '../../data/mockUser';
import { NavBar, mapStateToProps } from './NavBar';

describe('NavBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar activeUser={user.mockStateUser} />);
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map to store properly', () => {
    let mockStore = user.mockStateUser;

    let mapped = mapStateToProps(mockStore);

    expect(mapped.activeUser).toEqual(mockStore.mockStateUser);
  });
});
