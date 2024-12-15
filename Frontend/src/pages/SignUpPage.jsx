import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5003/api/signup', {
        name,
        email,
        password,
        position,
        role,
      });
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Sign-up failed! Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <TextField
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2, maxWidth: 400 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignUp}
        sx={{ maxWidth: 400 }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
