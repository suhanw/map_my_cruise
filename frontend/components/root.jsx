import React from 'react';
import {Provider} from 'react-redux';

const Root = ({store}) => (
  <Provider store={store}>
    <h2>Test</h2>
  </Provider>
);

export default Root;
