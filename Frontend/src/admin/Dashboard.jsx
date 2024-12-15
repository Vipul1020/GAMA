import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import AttendanceList from './AttendanceList';
import AttendanceForm from './AttendanceForm';
import AdminSidebar from './AdminSidebar'; // Import the sidebar component
import './AdminDashboard.css'; // Import your custom CSS for styling

const AdminDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const handleUserFormSuccess = () => {
    setShowUserForm(false);
    setSelectedUserId(null);
  };

  const handleAttendanceFormSuccess = () => {
    setSelectedAttendanceId(null);
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-dashboard-content">
        <div className="card user-management" id="user-management">
          <h2 className="card-title">User Management</h2>
          <UserList
            onSelectUser={(userId) => {
              setSelectedUserId(userId);
              setShowUserForm(true);
            }}
            onSelectAttendance={(userId) => {
              setSelectedUserId(userId); // Set user ID when viewing attendance
            }}
          />
          <button className="btn btn-add" onClick={() => setShowUserForm(true)}>Add New Employee</button>
          {showUserForm && (
            <UserForm
              employeeId={selectedUserId}
              onSuccess={handleUserFormSuccess}
            />
          )}
        </div>

        <div className="card attendance-management" id="attendance-management">
          <h2 className="card-title">Attendance Management</h2>
          {selectedUserId && (
            <AttendanceList
              employeeId={selectedUserId}
              onSelectAttendance={(attendanceId) => {
                setSelectedAttendanceId(attendanceId);
              }}
            />
          )}
          {selectedAttendanceId && (
            <AttendanceForm
              recordId={selectedAttendanceId}
              onSuccess={handleAttendanceFormSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
