import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
// import { auth } from '../firebase';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      // Firebase auth user creation
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Create MongoDB user entry
      const userData = {
        name: formData.name,
        email: formData.email,
        firebaseId: user.uid, // Store Firebase user UID in MongoDB
      };

      await axios.post('http://localhost:5000/api/users/register', userData); // Your backend endpoint

      alert('User registered successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Registration Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
