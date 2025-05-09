import React from 'react';
import { Container } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
    <SearchBar />
    <MovieGrid />
  </Container>
  );
};

export default Home;
