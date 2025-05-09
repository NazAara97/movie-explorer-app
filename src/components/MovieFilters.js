import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const MovieFilters = () => {
  const { filters, setFilters } = useContext(MovieContext);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" gap={2} my={2}>
      <FormControl fullWidth>
        <InputLabel>Genre</InputLabel>
        <Select name="genre" value={filters.genre} onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="28">Action</MenuItem>
          <MenuItem value="35">Comedy</MenuItem>
          <MenuItem value="18">Drama</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Year</InputLabel>
        <Select name="year" value={filters.year} onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 25 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <MenuItem key={year} value={year}>{year}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Rating</InputLabel>
        <Select name="rating" value={filters.rating} onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="8">8+</MenuItem>
          <MenuItem value="7">7+</MenuItem>
          <MenuItem value="6">6+</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MovieFilters;
