import React from 'react';
import { Profile, mapStateToProps } from './Profile';
import { mockStore } from '../../data/mockStore';

describe('Profile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Profile activeUser={mockStore.activeUser} />);
  });

  it('should matchSnapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map to the store properly', () => {
    const expected = mockStore.activeUser;
    const result = mapStateToProps(mockStore);

    expect(result.activeUser).toEqual(expected);
  });
});
