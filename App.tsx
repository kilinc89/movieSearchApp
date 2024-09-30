import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import Navigation from './app/navigation/Navigation';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
