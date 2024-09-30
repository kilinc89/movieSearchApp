import axios from 'axios';
import { RAPID_API_KEY } from "../../apikey"

const API_KEY = RAPID_API_KEY
const BASE_URL = 'https://movie-database-alternative.p.rapidapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
  },
});

export default api;
