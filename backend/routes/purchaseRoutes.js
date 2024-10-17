// routes/userRoutes.js
const express = require('express');
const { handlePurchase , getUserPurchases } = require('../controllers/purchaseController'); // Adjust the path to your controller
const router = express.Router();

// Route: User Registration
router.post('/purchase',handlePurchase);
router.get('/user/:userId/purchases', getUserPurchases);

module.exports = router;