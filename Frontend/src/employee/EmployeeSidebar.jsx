import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const listItemStyle = {
  color: '#ffffff', // Default text color
  '&:hover': {
    backgroundColor: 'rgba(34, 139, 34, 0.6)', // Greenish hover effect
    color: '#ffffff', // Keep text white on hover
    '& .MuiListItemIcon-root': {
      color: '#ffffff', // Keep icon white on hover
    },
  },
};

const drawerStyle = {
  width: 260,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 260,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(10, 25, 47, 0.85)', // Dark bluish transparent background
    color: '#ffffff', // White text
    padding: '20px',
    marginTop: '0px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)', // Blurred effect
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
};

const EmployeeSidebar = ({ onLogout }) => {
  return (
    <motion.div initial={{ x: -200 }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
      <Drawer variant="permanent" sx={drawerStyle}>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Employee Portal
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: '10px', backgroundColor: '#ffffff' }} />
        <List>
          <ListItem button component={RouterLink} to="/employee" sx={listItemStyle}>
            <ListItemIcon><HomeIcon style={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/employee/check-in" sx={listItemStyle}>
            <ListItemIcon><CheckCircleIcon style={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Check-In" />
          </ListItem>
          <ListItem button component={RouterLink} to="/employee/edit-profile" sx={listItemStyle}>
            <ListItemIcon><AccountCircleIcon style={{ color: '#ffffff' }} /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <Divider sx={{ margin: '20px 0', backgroundColor: '#ffffff' }} />
          <ListItem>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#e53935', // Red logout button
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#c62828', // Darker red on hover
                },
              }}
              onClick={onLogout}
            >
              LOGOUT
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </motion.div>
  );
};

export default EmployeeSidebar;
