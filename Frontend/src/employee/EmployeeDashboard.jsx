import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import EmployeeProfileCard from './EmployeeProfileCard';
import CheckInCard from './CheckInCard';
import GeolocationCheckInOut from './GeolocationCheckInOut';
import AttendanceChart from './AttendanceChart';
import AttendanceRecords from './AttendanceRecords';
import TotalWorkingHours from './TotalWorkingHours';

const cardStyle = {
  width: '100%',
  height: '200px',
  textAlign: 'center',
  borderRadius: '15px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
};

const EmployeeDashboard = ({ onLogout }) => {
  const [view, setView] = useState('chart'); // 'chart' or 'records'
  const [attendanceStatus, setAttendanceStatus] = useState(''); // To store the attendance status
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch attendance status for the logged-in user
    const fetchAttendanceStatus = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/attendance/status?employee_id=${userId}`);
          const data = await response.json();
          if (data.status) {
            setAttendanceStatus(data.status); // Set attendance status
          } else {
            setAttendanceStatus('Not checked in'); // Default status if no status found
          }
        } catch (error) {
          console.error('Error fetching attendance status:', error);
        }
      }
    };

    fetchAttendanceStatus();
  }, [userId]);

  const handleViewDetails = () => {
    setView('records');
  };

  const handleBackToChart = () => {
    setView('chart');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <Typography variant="h4" gutterBottom>Hi, {userName}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ ...cardStyle, backgroundImage: 'url(/images/26815.png)' }}>
              <EmployeeProfileCard />
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ ...cardStyle, backgroundImage: 'url(/images/pic2.png)' }}>
              <CheckInCard />
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ ...cardStyle, backgroundImage: 'url(/images/StatusCard.png)' }}>
              <div
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  }}
>
  <GeolocationCheckInOut />
</div>
              <Typography variant="h6" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                {attendanceStatus} {/* Display the attendance status */}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          {view === 'chart' ? (
            <AttendanceChart onDetailsClick={handleViewDetails} />
          ) : (
            <>
              <AttendanceRecords />
              <Button variant="contained" onClick={handleBackToChart} sx={{ marginTop: 1 , marginLeft: 2 }}>
                Back to Chart
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <TotalWorkingHours />
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default EmployeeDashboard;
