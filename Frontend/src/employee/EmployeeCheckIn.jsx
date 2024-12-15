// src/employee/EmployeeCheckIn.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckInForm from '../admin/CheckInForm';

function EmployeeCheckIn() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Employee Check-In</Typography>
      <CheckInForm />
    </Box>
  );
}

export default EmployeeCheckIn;
