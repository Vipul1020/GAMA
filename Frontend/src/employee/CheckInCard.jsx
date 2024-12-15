import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

;

const cardStyle = {
  width: '100%',
  height: '100%',
  perspective: 1000,
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '15px',
  overflow: 'hidden',
};

const innerCardStyle = {
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  position: 'relative',
};

const frontBackCommonStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: '15px',
};

const frontStyle = {
  ...frontBackCommonStyle,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  transition: 'opacity 0.3s',
  '&:hover': {
    opacity: 0.7,
  },
};

const CheckInCard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={cardStyle} onClick={() => navigate('/employee/check-in')}>
      <motion.div style={{ ...innerCardStyle, transform: 'rotateY(0deg)' }}>
        <Box sx={frontStyle}>
          <Typography variant="h6" sx={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>Check In</Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CheckInCard;
