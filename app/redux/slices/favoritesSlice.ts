import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetail } from '../../types';
import { storage } from '../../utils/storage';
import { storageKeys } from '../../utils/storageKeys';

interface FavoritesState {
  list: MovieDetail[];
}

const initialState: FavoritesState = {
  list: [],
};

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', async () => {
  try {
    const favoritesString = storage.getString(storageKeys.FAVORITES);
    if (favoritesString) {
      const favorites = JSON.parse(favoritesString);
      return favorites as MovieDetail[];
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<MovieDetail>) {
      state.list.push(action.payload);
      storage.set(storageKeys.FAVORITES, JSON.stringify(state.list));
    },
    removeFavorite(state, action: PayloadAction<{ imdbID: string }>) {
      state.list = state.list.filter((item) => item.imdbID !== action.payload.imdbID);
      storage.set(storageKeys.FAVORITES, JSON.stringify(state.list));
    },
    setFavorites(state, action: PayloadAction<MovieDetail[]>) {
      state.list = action.payload;
      storage.set(storageKeys.FAVORITES, JSON.stringify(state.list));
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
