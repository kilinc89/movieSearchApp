import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { listenerMiddleware } from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';



export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),

});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


