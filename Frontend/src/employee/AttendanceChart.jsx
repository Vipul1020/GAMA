import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Button } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = ({ onDetailsClick }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/attendance/${employeeId}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setError('Failed to fetch attendance records');
      }
    };
    fetchRecords();
  }, [employeeId]);

  const chartData = {
    labels: records.map(record => new Date(record.check_in_time).toLocaleDateString()),
    datasets: [
      {
        label: 'Hours Worked',
        data: records.map(record => {
          const checkIn = new Date(record.check_in_time);
          const checkOut = record.check_out_time ? new Date(record.check_out_time) : new Date();
          const diffMs = checkOut - checkIn;
          return (diffMs / (1000 * 60 * 60)).toFixed(2);
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Attendance Records</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      <Button onClick={onDetailsClick} sx={{ marginTop: 2 }}>View Details</Button>
    </Box>
  );
};

export default AttendanceChart;
