import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import AdminDashboard from './admin/Dashboard';
import EmployeeDashboard from './employee/EmployeeDashboard';
import EmployeeCheckIn from './employee/EmployeeCheckIn';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import theme from './theme';
import Sidebar from './components/Sidebar';
import EditProfilePage from './employee/EditProfilePage';
import EmployeeSidebar from './employee/EmployeeSidebar';
import OfficeLocations from './admin/OfficeLocations';


const App = () => {
  const handleLogout = () => {
    localStorage.clear();  // Clears all localStorage data
    sessionStorage.clear();  // Optionally clear sessionStorage
    window.location.href = '/';  // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} title="Admin Dashboard" isAdmin onLogout={handleLogout} />} />
          <Route path="/offices" element={OfficeLocations} />
          <Route path="/employee" element={<ProtectedRoute component={EmployeeDashboard} title="Employee Dashboard" onLogout={handleLogout} />} />
          <Route path="/employee/edit-profile" element={<ProtectedRoute component={EditProfilePage} title="Edit Profile" />} />
          <Route path="/employee/check-in" element={<ProtectedRoute component={EmployeeCheckIn} title="Employee Check-In" onLogout={handleLogout} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const ProtectedRoute = ({ component: Component, title, isAdmin, onLogout }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('role');

  console.log('ProtectedRoute -> isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute -> userRole:', userRole);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if ((isAdmin && userRole !== 'admin') || (!isAdmin && userRole !== 'employee')) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isAdmin ? <Sidebar onLogout={onLogout} /> : <EmployeeSidebar onLogout={onLogout} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar title={title} />
        <Component />
      </Box>
    </Box>
  );
};

export default App;
