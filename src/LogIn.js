import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Container } from '@mui/material';
import api from './components/api.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    api.postLogin(email, password); 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Button
            component={Link}
            to="/signin"
            fullWidth
            variant="text"
          >
            Don't have an account? Sign Up
          </Button>
          <Button
            fullWidth
            variant="text"
            href='https://yopmail.com/fr/'
          >
            Forgot your password ?
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
