import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';
import LoginIcon from '@mui/icons-material/Login';
import ErrorIcon from '@mui/icons-material/Error';

const listItemStyle = {
  '&:hover': {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    '& .MuiListItemIcon-root': {
      color: '#ffffff',
    },
  },
};

function Sidebar() {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#1976d2',
            color: '#ffffff',
          },
        }}
      >
        <List>
          {/* Admin Portal Links */}
          <ListItem button component={RouterLink} to="/admin" sx={listItemStyle}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={RouterLink} to="/admin/users" sx={listItemStyle}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
          <ListItem button component={RouterLink} to="/admin/products" sx={listItemStyle}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem button component={RouterLink} to="/admin/blog" sx={listItemStyle}>
            <ListItemIcon><ArticleIcon /></ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
          <ListItem button component={RouterLink} to="/admin/signin" sx={listItemStyle}>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button component={RouterLink} to="/admin/notfound" sx={listItemStyle}>
            <ListItemIcon><ErrorIcon /></ListItemIcon>
            <ListItemText primary="Not found" />
          </ListItem>

          {/* Employee Portal Links */}
          <ListItem button component={RouterLink} to="/employee" sx={listItemStyle}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Employee Portal" />
          </ListItem>
          <ListItem button component={RouterLink} to="/employee/check-in" sx={listItemStyle}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Check-In" />
          </ListItem>
        </List>
      </Drawer>
    </motion.div>
  );
}

export default Sidebar;
