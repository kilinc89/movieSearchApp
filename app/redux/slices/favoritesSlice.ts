import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetail } from '../../types';

interface FavoritesState {
  list: MovieDetail[];
}

const initialState: FavoritesState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<MovieDetail>) {
      state.list.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<{ imdbID: string }>) {
      state.list = state.list.filter((item) => item.imdbID !== action.payload.imdbID);
    },
    setFavorites(state, action: PayloadAction<MovieDetail[]>) {
      state.list = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
