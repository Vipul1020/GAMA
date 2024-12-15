import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceForm = ({ recordId, onSuccess }) => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (recordId) {
      axios.get(`http://localhost:5003/api/attendance/${recordId}`)
        .then(response => {
          const { check_in_time, check_out_time, approved } = response.data;
          setCheckInTime(check_in_time);
          setCheckOutTime(check_out_time);
          setApproved(approved);
        })
        .catch(error => {
          console.error('Error fetching attendance record:', error);
        });
    }
  }, [recordId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const attendanceData = { check_in_time: checkInTime, check_out_time: checkOutTime, approved };

    axios.put(`http://localhost:5003/api/attendance/${recordId}`, attendanceData)
      .then(response => {
        alert('Attendance record updated successfully');
        onSuccess();
      })
      .catch(error => {
        console.error('Error updating attendance record:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Check-in Time:</label>
        <input
          type="datetime-local"
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Check-out Time:</label>
        <input
          type="datetime-local"
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
        />
      </div>
      <div>
        <label>Approved:</label>
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AttendanceForm;
