import React, { useContext, useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { MovieContext } from '../context/MovieContext';
import tmdb from '../api/tmdb';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setMovies, setSearchTerm, setPage, setTotalPages } = useContext(MovieContext);

  useEffect(() => {
    // Persist query state across refreshes
    const storedSearchTerm = localStorage.getItem('searchTerm');
   

    if (storedSearchTerm) {
      setQuery(storedSearchTerm);
    }
  }, []);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && query.trim()) {
      try {
        setPage(1);
        setSearchTerm(query);
        const res = await tmdb.get('/search/movie', { params: { query, page: 1 } });
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        localStorage.setItem('searchTerm', query);  // Persist the search term to localStorage
      } catch (err) {
        alert('Failed to search. Please try again.');
      }
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setSearchTerm('');
    setMovies([]);
    setPage(1);
    setTotalPages(0);
    localStorage.removeItem('searchTerm'); // Remove persisted search term
    localStorage.removeItem('movies'); // Clear movie data from localStorage
  };

  return (
    <TextField
      label="Search for movies"
      fullWidth
      variant="outlined"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: query && (
          <InputAdornment position="end">
            <IconButton onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
