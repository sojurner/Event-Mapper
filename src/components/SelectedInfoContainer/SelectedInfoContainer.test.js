import React from 'react';
import { SelectedInfoContainer } from './SelectedInfoContainer';

describe('SelectedInfoContainer', () => {
  let wrapper = shallow(<SelectedInfoContainer  />);
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
