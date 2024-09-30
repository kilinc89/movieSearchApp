import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import NavigationContainer from './app/navigation/Navigation1';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    </>
  );
}

export default App;
