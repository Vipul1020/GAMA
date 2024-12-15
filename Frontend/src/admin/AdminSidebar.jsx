import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSidebar.css'; // Import custom CSS for styling

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove any authentication token or session data
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Admin Dashboard</h3>
      </div>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <button onClick={() => handleNavigation('/user-management')}>User Management</button>
        </li>
        <li className="nav-item">
          <button onClick={() => handleNavigation('/attendance-management')}>Attendance Management</button>
        </li>
        <li className="nav-item">
          <button onClick={() => handleNavigation('/reports')}>Reports</button>
        </li>
        <li className="nav-item">
          <button onClick={() => handleNavigation('/offices')}>Office Locations</button>
        </li>
        <li className="nav-item logout">
          <button onClick={() => handleLogout('/logout')}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
