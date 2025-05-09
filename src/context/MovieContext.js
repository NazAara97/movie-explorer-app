/* eslint-disable no-undef */
import React, { createContext, useState, useEffect } from 'react';
import tmdb from '../api/tmdb';  // Import tmdb API if necessary

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem('movies')) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '');
  const [page, setPage] = useState(() => Number(localStorage.getItem('page')) || 1);
  const [totalPages, setTotalPages] = useState(() => Number(localStorage.getItem('totalPages')) || 1);
  const [genres, setGenres] = useState(() => localStorage.getItem('genres') || '');
  const [filters, setFilters] = useState(() => localStorage.getItem('filters') || '');
  // Persist favorites, searchTerm, and other states to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('page', page);
    localStorage.setItem('totalPages', totalPages);
    localStorage.setItem('filters', JSON.stringify(filters));

    const fetchGenres = async () => {
      try {
        const res = await tmdb.get('/genre/movie/list');
        setGenres(res.data.genres);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };
    fetchGenres();
  }, [favorites, searchTerm, movies, page, totalPages, genres, filters]);

  // Reset to trending if no searchTerm
  useEffect(() => {
    if (!searchTerm) {
      const fetchTrending = async () => {
        try {
          const res = await tmdb.get('/trending/movie/week');
          setMovies(res.data.results);
        } catch (err) {
          alert('Failed to fetch trending movies.');
        }
      };
      fetchTrending();
    }
  }, [searchTerm, setMovies]);

  return (
    <MovieContext.Provider value={{
      movies, setMovies,
      searchTerm, setSearchTerm,
      favorites, setFavorites,
      page, setPage,
      totalPages, setTotalPages,
      genres, setGenres,
      filters, setFilters
    }}>
      {children}
    </MovieContext.Provider>
  );
};
