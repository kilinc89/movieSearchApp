import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import Navigation from './app/navigation/Navigation';
import { loadFavorites } from './app/redux/slices/favoritesSlice';

function App(): React.JSX.Element {

  useEffect(() => {
    store.dispatch(loadFavorites());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
