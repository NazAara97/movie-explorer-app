import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import { getTheme } from './theme';

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function App() {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add your actual logout logic here (e.g., clear auth tokens/context)
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <AppBar position="static" color="default">
            <Toolbar>
              {/* App Name */}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: '#001f3f', fontWeight: 'bold' }} // Dark Blue
              >
                MOVIEADDICTS
              </Typography>

              {/* Navigation Buttons */}
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/favorites">Favorites</Button>

              {/* Theme Toggle */}
              <Button color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                Toggle Mode
              </Button>

              {/* Profile Icon */}
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>

              {/* Profile Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
