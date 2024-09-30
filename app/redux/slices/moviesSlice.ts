import { createListenerMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';
import { AppDispatch, RootState } from '../storeInterface';
import { fetchMovies } from '../../factory/services';


interface MoviesState {
  list: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalResults: number;
  searchTerm: string;
}

const initialState: MoviesState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  totalResults: 0,
  searchTerm: 'Batman',
};

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return currentState.movies.searchTerm !== previousState.movies.searchTerm 
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(resetMovies());
    listenerApi.cancelActiveListeners();

    await listenerApi.delay(500);
    const response = await fetchMovies(listenerApi.getState().movies.searchTerm, listenerApi.getState().movies.page);

    if (response.data.Response === 'True') {
      listenerApi.dispatch(fetchMoviesSuccess(response.data))
     
    } else {
      listenerApi.dispatch(fetchMoviesFailure(response.data.Error || 'Error fetching movies'))
    }
  },
});


listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return currentState.movies.page !== previousState.movies.page;
  },
  effect: async (_action, listenerApi) => {
    const response = await fetchMovies(listenerApi.getState().movies.searchTerm, listenerApi.getState().movies.page);

    if (response.data.Response === 'True') {
      listenerApi.dispatch(fetchMoreMoviesSuccess(response.data))
     
    } else {
      listenerApi.dispatch(fetchMoviesFailure(response.data.Error || 'Error fetching movies'))
    }
  },
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<{ Search: Movie[]; totalResults: string }>) {
      state.error = null;
      state.loading = false;
      state.list = [...action.payload.Search];
      state.totalResults = parseInt(action.payload.totalResults, 10);
    },

    fetchMoreMoviesSuccess(state, action: PayloadAction<{ Search: Movie[]; totalResults: string }>) {
      state.error = null;
      state.loading = false;
      state.list = [...state.list, ...action.payload.Search];
      state.totalResults = parseInt(action.payload.totalResults, 10);
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetMovies(state) {
      state.list = [];
      state.page = 1;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
      console.log('load more page', state.page);
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  resetMovies,
  setSearchTerm,
  incrementPage,
  fetchMoreMoviesSuccess
} = moviesSlice.actions;

export default moviesSlice.reducer;
