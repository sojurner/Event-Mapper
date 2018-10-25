<<<<<<< HEAD:src/components/App/App.test.js
import React from 'react';

import App from './App';
=======
// import React from 'react';
// import App from './App';
>>>>>>> 95db2ac37a1b74e7b2b0ae76b03fe6ade38963ae:src/containers/App/App.test.js

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
