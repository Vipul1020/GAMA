import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import CheckInStatusCard from './CheckInStatusCard';

const GeolocationCheckInOut = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState(() => sessionStorage.getItem('checkedIn') === 'true');
  const [checkedOut, setCheckedOut] = useState(() => sessionStorage.getItem('checkedOut') === 'true');
  const [statusMessage, setStatusMessage] = useState('Initializing location monitoring...');
  const [officeLocations, setOfficeLocations] = useState([]);
  const [isManualCheckIn] = useState(false);  // Track manual check-in
  const watchId = useRef(null); 
  const isActionInProgress = useRef(false); 
  const lastActionTimestamp = useRef(0); 

  const THROTTLE_TIME = 3000;

  const updateSessionState = useCallback((checkInState, checkOutState) => {
    sessionStorage.setItem('checkedIn', checkInState.toString());
    sessionStorage.setItem('checkedOut', checkOutState.toString());
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371e3; 
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
  }, []);

  const getClosestOffice = useCallback((latitude, longitude) => {
    if (officeLocations.length === 0) return null;

    return officeLocations.reduce(
      (closest, office) => {
        const distance = calculateDistance(latitude, longitude, office.latitude, office.longitude);
        return distance < closest.distance ? { ...office, distance } : closest;
      },
      { distance: Infinity }
    );
  }, [calculateDistance, officeLocations]);

  const performCheckInOrOut = useCallback(
    async (latitude, longitude, action) => {
      if (isActionInProgress.current) return;

      const now = Date.now();
      if (now - lastActionTimestamp.current < THROTTLE_TIME) return;

      isActionInProgress.current = true;

      try {
        setLoading(true);
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) throw new Error('Employee ID not found in localStorage.');

        const closestOffice = getClosestOffice(latitude, longitude);

        if (closestOffice) {
          const { id: officeId, name: officeName, latitude: officeLat, longitude: officeLon } = closestOffice;
          const distance = calculateDistance(latitude, longitude, officeLat, officeLon);

          if (action === 'checkin' && distance <= 200 && !checkedIn && !isManualCheckIn) {
            setStatusMessage(`Checking in at ${officeName}...`);
            await axios.post('http://localhost:5003/checkin', {
              employeeId,
              officeId,
              officeName,
              latitude,
              longitude,
            });
            setCheckedIn(true);
            setCheckedOut(false);
            updateSessionState(true, false);
            setStatusMessage(`You are checked in at ${officeName}.`);
            alert('Check-in successful!');
          } else if (action === 'checkin' && isManualCheckIn) {
            // Manual check-in message
            setStatusMessage(`Manual check-in successful at ${closestOffice.name}. Automatic check-in will resume after manual check-out.`);
          } else if (action === 'checkout' && distance > 200 && !checkedOut) {
            setStatusMessage(`Checking out from ${officeName}...`);
            await axios.post('http://localhost:5003/checkout', {
              employeeId,
              officeId,
              officeName,
            });
            setCheckedIn(false);
            setCheckedOut(true);
            updateSessionState(false, true);
            setStatusMessage('You have checked out successfully. Automatic check-in will resume.');
            alert('Check-out successful!');
          } else {
            setStatusMessage(
              action === 'checkin'
                ? `You are not within range to check in. (${officeName})`
                : `You are still within range of ${officeName}.`
            );
          }
        } else {
          setStatusMessage('No nearby office location detected.');
        }

        lastActionTimestamp.current = now;
      } catch (err) {
        setError('Error during action');
        console.error(err);
      } finally {
        isActionInProgress.current = false;
        setLoading(false);
      }
    },
    [checkedIn, checkedOut, calculateDistance, getClosestOffice, isManualCheckIn, updateSessionState]
  );

  useEffect(() => {
    axios
      .get('http://localhost:5003/offices')
      .then((response) => {
        setOfficeLocations(response.data || []);
      })
      .catch((err) => {
        setError('Error fetching office data');
        console.error(err);
      });

    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          if (!checkedIn && !isManualCheckIn) {
            performCheckInOrOut(latitude, longitude, 'checkin');
          } else if (checkedIn && !checkedOut && !isManualCheckIn) {
            performCheckInOrOut(latitude, longitude, 'checkout');
          }
        },
        (error) => {
          if (error.code === 2) setStatusMessage('Location not available.');
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      setError('Geolocation not supported');
    }

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [checkedIn, checkedOut, isManualCheckIn, performCheckInOrOut]);

  return (
    <div>
      <CheckInStatusCard status={statusMessage} checkedIn={checkedIn} checkedOut={checkedOut} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GeolocationCheckInOut;
