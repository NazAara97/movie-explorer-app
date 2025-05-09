// src/api/tmdb.js
import axios from 'axios';

const API_KEY = '6baff86be79514438ca98f9562daf942'; // Replace with your actual API key

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});