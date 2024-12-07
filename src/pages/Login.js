import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { auth } from '../firebase';  // Firebase Authentication
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Sign in using Firebase Auth
      const userCredential = await auth.signInWithEmailAndPassword(formData.email, formData.password);

      // Get Firebase ID token (JWT)
      const token = await userCredential.user.getIdToken();

      // Send token to backend for authentication
      const response = await axios.post('http://localhost:5000/api/users/login', { token });

      // Handle the response (e.g., store token or redirect)
      if (response.status === 200) {
        alert('Logged in successfully!');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
