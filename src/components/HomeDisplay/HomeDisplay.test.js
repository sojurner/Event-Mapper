import React from 'react';

import { HomeDisplay } from './HomeDisplay';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('HomeDisplay', () => {
  it('should match snapshot', () => {
    let wrapper = shallow(<HomeDisplay mapType={`dark`} />);
    expect(wrapper).toMatchSnapshot();
  });
});
