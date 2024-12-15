import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';

const TotalWorkingHours = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalHours, setTotalHours] = useState('');
  const [error, setError] = useState(null);
  const employeeId = localStorage.getItem('employeeId');

  const handleFetchHours = async () => {
    try {
      const response = await axios.get('http://localhost:5003/total-hours', {
        params: { employeeId, date },
      });
      setTotalHours(response.data.totalHours);
    } catch (error) {
      console.error('Error fetching total working hours:', error);
      setError('Failed to fetch total working hours');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Total Working Hours</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleFetchHours}>
        Fetch Hours
      </Button>
      {totalHours && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {totalHours}
        </Typography>
      )}
    </Box>
  );
};

export default TotalWorkingHours;
