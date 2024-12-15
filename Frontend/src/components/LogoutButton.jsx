import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import authService from '../services/authService';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout(); // API call to logout (if needed)
    sessionStorage.clear();
    localStorage.clear();  // Clears both sessionStorage and localStorage
    // Reset any other relevant states if required, for example:
    // setAttendanceStatus('Not checked in'); // If you're using state

    navigate('/login', { replace: true });
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<ExitToApp />}
      onClick={handleLogout}
      style={{ width: '100%' }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
