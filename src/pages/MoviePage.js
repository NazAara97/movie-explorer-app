import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip
} from '@mui/material';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [details, credits, videos] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/credits`),
          tmdb.get(`/movie/${id}/videos`)
        ]);

        setMovie(details.data);
        setCast(credits.data.cast.slice(0, 6));
        const trailer = videos.data.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key);
      } catch (err) {
        alert('Failed to load movie details.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Typography sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Poster */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Card>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Genres:
              </Typography>
              {movie.genres.map(g => (
                <Chip key={g.id} label={g.name} sx={{ mr: 1, mb: 1 }} />
              ))}
            </>
          )}

          {/* Top Cast */}
          {cast.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Top Cast:
              </Typography>
              <Grid container spacing={1}>
                {cast.map(actor => (
                  <Grid item key={actor.id} xs={6} sm={4}>
                    <Typography variant="body2" noWrap>
                      {actor.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Trailer */}
          {trailerKey && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Trailer:
              </Typography>
              <iframe
                style={{ marginTop: '8px' }}
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;
