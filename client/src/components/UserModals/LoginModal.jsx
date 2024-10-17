import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({ open, onClose }) => {
  // Managing both email and password with a single credentials state object
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://react-js-furniture-shop-5.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Ensure content-type is JSON
        body: JSON.stringify(credentials), // Send email and password as JSON
      });
      
      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', result.token); 
        localStorage.setItem('userId', result.userId)
        localStorage.setItem('email', result.email)
        localStorage.setItem('username', result.username)
        //console.log(localStorage.getItem('userId'));
        // Save token to local storage
        console.log(result)
        alert('Login successful!');
        onClose(); // Close modal on success
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Login
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          value={credentials.email}
          onChange={handleChange} // Update credentials when the email input changes
        />
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={credentials.password}
          onChange={handleChange} // Update credentials when the password input changes
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
