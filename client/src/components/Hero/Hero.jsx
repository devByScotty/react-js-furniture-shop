import React from 'react';
import chair from '../../assets/hero-img.png';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <Box sx={{ backgroundColor: '#5C8659', width: '100%', height: {xs:'93.5vh',md:'90vh'}, padding: '10px', overflow: 'hidden', position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, height: '100%', width: '100%' }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <Typography variant="h1" sx={{ textAlign: 'left', fontFamily: 'Dancing Script', fontSize: { xs: '1.8rem', md: '4rem' }, color: 'white', lineHeight: 1.5 }}>
           Welcome To <br /> Trivia Furniture <br />For A Minimal Furniture <FontAwesomeIcon icon={faStar} /><br /> Collection
          </Typography>
        </Box>
        <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <Box sx={{
            position: 'absolute', backgroundColor: '#F6EDD9', borderRadius: '80px', zIndex: 5, animation: 'floatimg 6s infinite', width: { xs: '250px', md: '500px' }, height: { xs: '220px', md: '500px' }, top: { xs: '5%', md: '10%' }, right: { xs: '15%', md: '17%' }, '@keyframes floatimg': {
              '0%': { transform: 'translate(0px, 0px)' },
              '50%': { transform: 'translate(-10px, -10px)' },
              '100%': { transform: 'translate(0px, 0px)' }
            },
            marginBottom:{xs:'60px'}
          }}></Box>
          <Card sx={{
            width: { xs: '100%', md: '650px' }, // Responsive width
            height: { xs: '100%', md: '600px' },
            background: 'none',
            zIndex: '99',
            marginBottom:{xs:'40px'}// Responsive height
          }}>
            <CardMedia
              component="img"
              image={chair} // Use your imported image here
              alt="Chair"
              sx={{
                
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                maxWidth: '100%', // Ensures the image does not exceed its container width
                height: 'auto', // Allows the image height to adjust proportionally
                zIndex: '99'// Set background to none
              }}
            />
          </Card>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', left: 0, bottom: 0, backgroundColor: '#FFD984', width: '100%', height: '60px', zIndex: 99, textAlign: 'center', padding: '10px' }}>
        <Typography variant="h2" sx={{ width: '100%', fontSize: { xs: '0.9rem', md: '2rem' }, animation: 'slideInLeft 4s ease-out', color: 'black' }}>
          More than 8 <FontAwesomeIcon icon={faStar} /> Interior Design <FontAwesomeIcon icon={faStar} /> 20% Off Products
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
