import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import MovieCard from './MovieCard';
import { MovieContext } from '../context/MovieContext';
import tmdb from '../api/tmdb';
import MovieFilters from './MovieFilters';

const MovieGrid = () => {
  const {
    searchTerm, movies, setMovies,
    page, setPage, totalPages, setTotalPages,
    filters
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = { page: 1, sort_by: 'popularity.desc' };
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;
        if (filters.rating) params['vote_average.gte'] = filters.rating;

        const res = await tmdb.get('/discover/movie', { params });
        setMovies(res.data.results);
        setPage(1);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        alert('Failed to fetch movies.');
      }
    };

    if (!searchTerm) fetchMovies();
  }, [filters, searchTerm, setMovies, setPage, setTotalPages]);

  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      let res;

      if (searchTerm) {
        res = await tmdb.get('/search/movie', {
          params: { query: searchTerm, page: nextPage },
        });
      } else {
        const params = {
          page: nextPage,
          sort_by: 'popularity.desc',
        };
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;
        if (filters.rating) params['vote_average.gte'] = filters.rating;

        res = await tmdb.get('/discover/movie', { params });
      }

      setMovies(prev => [...prev, ...res.data.results]);
      setPage(nextPage);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      alert('Failed to load more results.');
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {searchTerm ? `Search Results for "${searchTerm}"` : 'Trending This Week'}
      </Typography>

      {!searchTerm && <MovieFilters />}

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {page < totalPages && (
        <Box textAlign="center" mt={3}>
          <Button variant="contained" onClick={loadMore}>Load More</Button>
        </Box>
      )}
    </>
  );
};

export default MovieGrid;
