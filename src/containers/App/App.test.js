import React from 'react';

import { App, mapDispatchToProps } from './App';
import * as user from '../../data/mockUser';
import * as params from '../../data/mockUserParams';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('App', () => {
  let wrapper;
  let mockLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App loginUser={mockLogin} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when user is logged in', () => {
    wrapper.setState({ user: { name: 'paul' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when displaySidebar is true', () => {
    wrapper.setState({ displaySidebar: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.loginUser();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call postUser with correct Params', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(user.mockStateUser)
      })
    );

    await wrapper.instance().login(user.mockUser);

    expect(window.fetch).toHaveBeenCalledWith(
      params.responseGoogle1,
      params.responseGoogle2
    );
    expect(mockLogin).toHaveBeenCalled();
    expect(wrapper.state().user).toEqual(user.mockStateUser);
  });

  it('should change state of user when logut is called', () => {
    wrapper.setState({ user: user.mockUser.profileObj });

    wrapper.instance().logout();

    expect(wrapper.state().user).toEqual(null);
  });

  it('should setState of mapType when changeMap is called', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().changeMap(mockEvent, 'dark');

    expect(wrapper.state().mapType).toEqual('dark');

    wrapper.instance().changeMap(mockEvent, 'streets');

    expect(wrapper.state().mapType).toEqual('streets');
  });

  it('should setState when displaySideBar is called', () => {
    expect(wrapper.state().displaySidebar).toEqual(false);

    wrapper.instance().displaySidebar();

    expect(wrapper.state().displaySidebar).toEqual(true);
  });

  it('should setState of displaySidebar on icon click', () => {
    expect(wrapper.state().displaySidebar).toEqual(false);

    wrapper.setState({ user: user.mockUser.profileObj });
    wrapper.update();
    wrapper.find('i').simulate('click');

    expect(wrapper.state().displaySidebar).toEqual(true);
  });

  it('should setState of mapType on button click', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.setState({ user: user.mockUser.profileObj });

    expect(wrapper.state().mapType).toEqual('streets');

    wrapper.find('button').simulate('click', mockEvent, 'dark');

    expect(wrapper.state().mapType).toEqual('dark');
  });
});
