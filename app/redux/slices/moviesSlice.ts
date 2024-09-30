import { MovieDetail } from './../../types/index';
import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';
import { AppDispatch, RootState } from '../storeInterface';
import { fetchMovieDetails, fetchMovies } from '../../factory/services';


interface MoviesState {
  list: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalResults: number;
  searchTerm: string;
  movieDetail?: MovieDetail;
  movieDetailError?: string | null;
  filters: {
    year: string;
    type: string;
  };
  
}

const initialState: MoviesState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  totalResults: 0,
  searchTerm: '',
  filters: {
    year: '',
    type: '',
  },
};

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return currentState.movies.searchTerm !== previousState.movies.searchTerm ||
      //year must be 4 digits or empty
      ((currentState.movies.filters.year.length == 4 || currentState.movies.filters.year.length == 0) && currentState.movies.filters.year !== previousState.movies.filters.year) ||
      currentState.movies.filters.type !== previousState.movies.filters.type;
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(resetMovies());
    listenerApi.cancelActiveListeners();

    await listenerApi.delay(500);
    const response = await fetchMovies(listenerApi.getState().movies.searchTerm, listenerApi.getState().movies.page,
      listenerApi.getState().movies.filters);

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
    const response = await fetchMovies(listenerApi.getState().movies.searchTerm, listenerApi.getState().movies.page,
      listenerApi.getState().movies.filters);
    
    if (response.data.Response === 'True') {
      listenerApi.dispatch(fetchMoreMoviesSuccess(response.data))
     
    } else {
      listenerApi.dispatch(fetchMoviesFailure(response.data.Error || 'Error fetching movies'))
    }
  },
});

export const loadMovieDetail = createAsyncThunk('movies/loadMovieDetail',
  async (payload: { imdbID: string, }, thunkAPI) => {
    const { imdbID } = payload;

    try {
      const response = await fetchMovieDetails(imdbID);
      return response.data;
    } catch (err) {
        console.error(err);
    } finally {
      thunkAPI.dispatch(moviesSlice.actions.setLoading(false));
    }
    
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
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setYearFilter(state, action: PayloadAction<string>) {
      state.filters.year = action.payload;
    },
    setTypeFilter(state, action: PayloadAction<string>) {
      state.filters.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMovieDetail.pending, (state) => {
      state.loading = true;
      state.movieDetailError = null;
    });
    builder.addCase(loadMovieDetail.fulfilled, (state, action) => {
      state.movieDetail = action.payload;
    });
    builder.addCase(loadMovieDetail.rejected, (state, action) => {
      state.loading = false;
      state.movieDetailError = action.error.message || 'Error fetching movie details';
    });
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  resetMovies,
  setSearchTerm,
  incrementPage,
  fetchMoreMoviesSuccess,
  setYearFilter,
  setTypeFilter,
  
} = moviesSlice.actions;

export default moviesSlice.reducer;
