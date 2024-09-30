export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  export interface MovieDetail extends Movie {
    Plot: string;
    Genre: string;
    Director: string;
    Actors: string;
    // Add other fields as needed
  }
  
  export interface MovieResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
  }
  