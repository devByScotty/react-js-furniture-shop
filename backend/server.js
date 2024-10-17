require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = require('./config');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Initialize Supabase client


// Route: Welcome
app.get('/', (req, res) => {
  const dummyData = {
    message: 'Hello from Express!',
    data: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ],
  };
  res.status(200).json(dummyData);
});

// Route: Fetch products
app.get('/api/products', async (req, res) => {
  try {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route: User Registration
app.use('/api', userRoutes);

// Route: Handle Purchase
app.use('/api', purchaseRoutes);


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
