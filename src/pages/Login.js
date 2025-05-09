import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsername = 'admin';
    const validPassword = 'password123';
  
    if (username === validUsername && password === validPassword) {
      localStorage.setItem('user', username);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" fullWidth onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
