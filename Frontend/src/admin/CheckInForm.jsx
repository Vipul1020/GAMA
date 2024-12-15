import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Box, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

function CheckInForm() {
  const [officeLocations, setOfficeLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [manualLocation, setManualLocation] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(() => sessionStorage.getItem('checkedIn') === 'true');
  const [error, setError] = useState('');

  // Fetch office locations from the server
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('http://localhost:5003/offices');
        setOfficeLocations(response.data);
        if (response.data.length > 0) {
          setSelectedLocation(response.data[0].id);
          setManualLocation(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching office locations:', error);
        setError('Failed to fetch office locations. Please try again later.');
      }
    };
    fetchOffices();
  }, []);

  const updateSessionState = (checkInState) => {
    sessionStorage.setItem('checkedIn', checkInState.toString());
  };

  // Manual Check-In handler
  const handleManualCheckIn = useCallback(async () => {
    if (isCheckedIn) {
      alert('You are already checked in.');
      return;
    }

    if (!manualLocation) {
      alert('Please select a valid office location.');
      return;
    }

    try {
      const employeeId = localStorage.getItem('employeeId');
      const response = await axios.post('http://localhost:5003/checkin', {
        employeeId,
        officeId: selectedLocation,
        officeName: manualLocation.name, // Add office name to request
        latitude: manualLocation.latitude,
        longitude: manualLocation.longitude,
      });

      if (response.data === 'Check-in successful') {
        setIsCheckedIn(true);
        updateSessionState(true);
        alert('Manual check-in successful');
      } else {
        setError(response.data);
        alert(response.data);
      }
    } catch (error) {
      console.error('Error during check-in:', error);
      setError('Error during check-in. Please try again.');
    }
  }, [isCheckedIn, manualLocation, selectedLocation]);

  // Manual Check-Out handler
  const handleManualCheckOut = useCallback(async () => {
    if (!isCheckedIn) {
      alert('You are not checked in.');
      return;
    }

    try {
      const employeeId = localStorage.getItem('employeeId');
      const response = await axios.post('http://localhost:5003/checkout', { 
        employeeId,
        officeId: selectedLocation, // Explicitly pass the office ID
        officeName: manualLocation.name, // Add office name to request
      });

      if (response.data === 'Check-out successful') {
        setIsCheckedIn(false);
        updateSessionState(false);
        alert('Check-out successful');
      } else {
        setError(response.data);
        alert(response.data);
      }
    } catch (error) {
      console.error('Error during check-out:', error);
      setError('Error during check-out. Please try again.');
    }
  }, [isCheckedIn, selectedLocation, manualLocation]);

  // Location change handler
  const handleLocationChange = (event) => {
    const selectedId = event.target.value;
    setSelectedLocation(selectedId);

    const selectedOffice = officeLocations.find((location) => location.id === parseInt(selectedId, 10));
    if (selectedOffice) {
      setManualLocation(selectedOffice);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Office Location Selection */}
      <FormControl fullWidth>
        <InputLabel>Select Location</InputLabel>
        <Select value={selectedLocation} onChange={handleLocationChange}>
          {officeLocations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Manual Check-In/Out Buttons */}
      {!isCheckedIn ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleManualCheckIn}
          sx={{ mt: 2, mr: 2 }}
        >
          Manual Check-In
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleManualCheckOut}
          sx={{ mt: 2, mr: 2 }}
        >
          Manual Check-Out
        </Button>
      )}

      {/* Error message */}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default CheckInForm;
