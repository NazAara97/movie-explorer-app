import React, { useState, useContext } from 'react';
import {
  Card, CardMedia, CardContent, Typography,
  IconButton, Dialog, Button, Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import tmdb from '../api/tmdb';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useContext(MovieContext);

  const isFav = favorites.some((fav) => fav.id === movie.id);

  const [trailerUrl, setTrailerUrl] = useState('');
  const [openTrailer, setOpenTrailer] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent navigation
    if (isFav) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/movie/${movie.id}`);
  };

  const handleWatchTrailer = async (e) => {
    e.stopPropagation(); // Prevent navigation
    try {
      const res = await tmdb.get(`/movie/${movie.id}/videos`);
      const trailer = res.data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setOpenTrailer(true);
      } else {
        alert('Trailer not available.');
      }
    } catch {
      alert('Failed to load trailer.');
    }
  };

  return (
    <>
      <Card onClick={handleCardClick} sx={{ cursor: 'pointer', position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}
          </Typography>

          <Box mt={1}>
            <Button size="small" onClick={handleWatchTrailer}>
              Watch Trailer
            </Button>
          </Box>
        </CardContent>

        <IconButton
          onClick={toggleFavorite}
          sx={{ position: 'absolute', top: 8, right: 8, color: isFav ? 'red' : 'white' }}
        >
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Card>

      <Dialog open={openTrailer} onClose={() => setOpenTrailer(false)} maxWidth="md" fullWidth>
        <iframe
          width="100%"
          height="400"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Dialog>
    </>
  );
};

export default MovieCard;
