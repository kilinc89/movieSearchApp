import api from ".";
import { MovieDetail,MovieResponse } from "../types/index"

export const fetchMovies = (searchTerm: string, page: number = 1) => {
  return api.get<MovieResponse>('/', {
    params: {
      s: searchTerm,
      page,
      r: 'json',
    },
  });
};

export const fetchMovieDetails = (imdbID: string) => {
  return api.get<MovieDetail>('/', {
    params: {
      i: imdbID,
      plot: 'full',
      r: 'json',
    },
  });
};
