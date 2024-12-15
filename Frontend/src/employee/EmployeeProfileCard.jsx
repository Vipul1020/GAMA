import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
};

const backStyle = {
  ...frontBackCommonStyle,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
  backdropFilter: 'blur(8px)',
  transform: 'rotateY(180deg)',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const EmployeeProfileCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('No email found in localStorage');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5003/api/profile', { email });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    navigate('/employee/edit-profile');
  };

  return (
    <Box sx={cardStyle} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        style={{
          ...innerCardStyle,
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Box sx={{ ...frontStyle, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h6">Profile</Typography>
        </Box>
        <Box sx={backStyle}>
          {profile ? (
            <>
              <Avatar
                src="/images/employee.png"
                alt="Employee Avatar"
                sx={{ width: 56, height: 56, marginBottom: '10px' }}
              />
              <Typography variant="h6" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>
                {profile.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '3px' }}>
                {profile.email}
              </Typography>
              <Typography variant="body2" sx={{ color: 'green' }}>
                {profile.position}
              </Typography>
              <Button
                variant="text"
                onClick={handleEdit}
                sx={{
                  marginTop: '1px',
                  color: '#007bff',
                  textTransform: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default EmployeeProfileCard;
