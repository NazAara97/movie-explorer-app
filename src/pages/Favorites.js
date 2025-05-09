import React, { useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>My Favorite Movies</Typography>
      {favorites.length === 0 ? (
        <Typography>You have no favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
