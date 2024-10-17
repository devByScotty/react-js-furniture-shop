import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginModal from '../UserModals/LoginModal';
import RegistrationModal from '../UserModals/RegistrationModal';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';




const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login modal
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for registration modal
  const [username, setUsername] = useState(null); // State to store the logged-in username

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Toggle Login Modal
  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Toggle Register Modal
  const toggleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  // Fetch the logged-in user's username from local storage (or any global state management solution)
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      const username = storedEmail.split('@')[0].toUpperCase(); // Extract the part before '@'
      setUsername(username); // Update username state
    }
  }, []);

  // Handle Logout (Clear local storage and reset state)
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from local storage
    setUsername(null); // Reset username state
  };

  const userId = localStorage.getItem('userId');

  return (
    <AppBar position="sticky" className="navHeader">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Logo */}
          <Typography variant="h6" className="navLogo" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <Link to="/" className="navLink" style={{ color: '#fff', textDecoration: 'none' }}>
              TRIVIA
            </Link>
          </Typography>

          {/* Navigation Links for larger screens */}
          <Box className="navListsItems" sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {/* Home Button */}
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<HomeIcon />}
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#4a6d47',
                  color: '#fff',
                },
              }}
            >
              HOME
            </Button>

            {/* Shop Button */}
            <Button
              component={Link}
              to="/shop"
              color="inherit"
              startIcon={<StoreIcon />}
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#4a6d47',
                  color: '#fff',
                },
              }}
            >
              SHOP
            </Button>
          </Box>

          {/* User Items like Login/Cart for larger screens */}
          <Box className="navUserItems" sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {username ? (
              <>
                {/* Show Username */}
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}  component={Link}
                  to={`/user/${userId}/purchases`}>
                  Welcome, {username}
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<LoginIcon sx={{ color: '#fff' }} />} >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login/Register buttons when user is not logged in */}
                <Button onClick={toggleLoginModal} color="inherit" startIcon={<LoginIcon sx={{ color: '#fff' }} />}>
                  Login
                </Button>
                <Button onClick={toggleRegisterModal} color="inherit" startIcon={<LoginIcon sx={{ color: '#fff' }} />}>
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Hamburger Menu for smaller screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer for mobile navigation */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250, backgroundColor: '#5C8659', padding: '10px' }}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="HOME" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/shop" onClick={toggleDrawer}>
            <ListItemIcon>
              <StoreIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="SHOP" sx={{ color: '#fff' }} />
          </ListItem>

          {username ? (
            <>
              {/* Logout button */}
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LoginIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: '#fff' }} />
              </ListItem>

              {/* Display username */}
              <ListItem button  component={Link}
                  to={`/user/${userId}/purchases`}>
                <Avatar sx={{ bgcolor: '#4a6d47', width: 35, height: 35 }}>
                  {username.charAt(0)}
                </Avatar>
                <ListItemText
                  component={Link}
                  to={`/user/${userId}/purchases`} // Dynamically including userId
                  primary={username}
                  sx={{ color: '#fff', marginLeft: 2 }} // Adding margin-left for spacing
                />
              </ListItem>
            </>

          ) : (
            <>
              <ListItem button onClick={toggleLoginModal}>
                <ListItemIcon><LoginIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Login" sx={{ color: '#fff' }} />
              </ListItem>
              <ListItem button onClick={toggleRegisterModal}>
                <ListItemIcon><LoginIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Register" sx={{ color: '#fff' }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      {/* Modals */}
      <LoginModal open={isLoginOpen} onClose={toggleLoginModal} />
      <RegistrationModal open={isRegisterOpen} onClose={toggleRegisterModal} />
    </AppBar>

  );
};

export default Navbar;

