import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const AttendanceRecords = () => {
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Attendance Records</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {records.map(record => (
          <ListItem key={record.id}>
            <Paper sx={{ width: '100%', padding: 2, marginBottom: 1 }}>
              <ListItemText
                primary={`Checked in at: ${new Date(record.check_in_time).toLocaleString()}`}
                secondary={`Checked out at: ${record.check_out_time ? new Date(record.check_out_time).toLocaleString() : 'N/A'}`}
              />
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AttendanceRecords;
