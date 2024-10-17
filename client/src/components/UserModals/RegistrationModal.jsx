import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RegistrationModal = ({ open, onClose }) => {
  // Manage form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  // Manage error state
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await fetch('https://react-js-furniture-shop-5.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Send form data
      });
      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        onClose(); // Close modal on success
        setFormData({ name: '', email: '', password: '', phone: '', address: '' }); // Reset form
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An unexpected error occurred. Please try again.'); // Set error message
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Register
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>} {/* Display error message */}
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          name="name"
          fullWidth
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phone"
          type="tel"
          fullWidth
          value={formData.phone}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Address"
          name="address"
          fullWidth
          multiline
          rows={2}
          value={formData.address}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRegister} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;



