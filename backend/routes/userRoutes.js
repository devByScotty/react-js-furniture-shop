// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser ,getUsers } = require('../controllers/userController'); // Adjust the path to your controller
const router = express.Router();

// Route: User Registration
router.post('/register', registerUser);

// Route: User Login
router.post('/login', loginUser);

// Route: User Login
router.get('/users',getUsers);


module.exports = router;
