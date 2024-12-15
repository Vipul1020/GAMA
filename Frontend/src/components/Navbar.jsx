import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function Navbar({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
