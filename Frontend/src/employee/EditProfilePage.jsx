import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', position: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        alert('No user email found. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5003/api/profile', { email });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch profile. Please try again.');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSaveProfile = async () => {
    if (!profile.name || !profile.position) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put('http://localhost:5003/api/update-profile', {
        email: profile.email,
        name: profile.name,
        position: profile.position,
      });
      alert(response.data.message);
      navigate('/employee');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert('Please fill in both old and new passwords.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.put('http://localhost:5003/api/update-profile', {
        email: profile.email,
        oldPassword: oldPassword,  // Send old password as part of the request
        newPassword: newPassword,  // Send new password as part of the request
      });
      alert(response.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'An error occurred while changing your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/employee');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Edit Profile</Typography>
      <TextField
        label="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        fullWidth
        sx={{ marginBottom: '15px' }}
      />
      <TextField
        label="Email"
        value={profile.email}
        disabled
        fullWidth
        sx={{ marginBottom: '15px' }}
      />
      <TextField
        label="Position"
        value={profile.position}
        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
        fullWidth
        sx={{ marginBottom: '15px' }}
      />
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>Change Password</Typography>
      <TextField
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: '15px' }}
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: '15px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        disabled={loading}
        sx={{ marginRight: '10px' }}
      >
        Save Profile
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleChangePassword}
        disabled={loading}
        sx={{ marginRight: '10px' }}
      >
        Change Password
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default EditProfilePage;
