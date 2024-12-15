import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceList = ({ employeeId, onSelectAttendance }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState({});

  useEffect(() => {
    if (!employeeId) return;

    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/attendance/${employeeId}`);
        setAttendanceRecords(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError('Failed to fetch attendance records.');
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) {
    return <p>Loading attendance records...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (attendanceRecords.length === 0) {
    return <p>No attendance records found for this employee.</p>;
  }

  // Handle selection of attendance checkboxes
  const handleCheckboxChange = (recordId) => {
    setSelectedAttendance(prevState => {
      const newSelected = { ...prevState };
      if (newSelected[recordId]) {
        delete newSelected[recordId];
      } else {
        newSelected[recordId] = true;
      }
      return newSelected;
    });
  };

  // Approve selected attendance records
  const handleApproveMultiple = async () => {
    const selectedRecords = Object.keys(selectedAttendance); // Get selected record IDs
    try {
       await axios.put('http://localhost:5003/api/attendance/approve', { attendanceIds: selectedRecords });
      // Update the records with approval status locally
      setAttendanceRecords(prevRecords =>
        prevRecords.map(record =>
          selectedRecords.includes(String(record.id))
            ? { ...record, approved: 1 }
            : record
        )
      );
      alert('Selected records approved successfully');
    } catch (error) {
      console.error('Error approving attendance records:', error);
      alert('Error approving attendance records');
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <button onClick={handleApproveMultiple} disabled={Object.keys(selectedAttendance).length === 0}>
        Approve Selected
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedAttendance[record.id] || false}
                  onChange={() => handleCheckboxChange(record.id)}
                />
              </td>
              <td>{new Date(record.check_in_time).toLocaleString()}</td>
              <td>{record.check_out_time ? new Date(record.check_out_time).toLocaleString() : 'Still in office'}</td>
              <td>{record.approved ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
