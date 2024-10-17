const { createPurchase } = require('../models/purchaseModels');
const supabase = require('../config'); 

const handlePurchase = async (req, res) => {
    const { purchases, totalAmount } = req.body;
  
    console.log('Incoming Request Body:', req.body);
  
    // Check if purchases is an array
    if (!Array.isArray(purchases) || purchases.length === 0) {
      return res.status(400).json({ message: 'Invalid purchase data: purchases must be an array' });
    }
  
    try {
      // Process all purchases and wait for them to complete
      const purchaseResults = await Promise.all(
        purchases.map(async (purchase) => {
          const { userId, productId, quantity } = purchase;
          console.log('Processing purchase for:', { userId, productId, quantity, totalAmount });
  
          // Call the createPurchase function for each item
          return await createPurchase(userId, productId, quantity, totalAmount);
        })
      );
  
      // Return success response
      res.status(201).json({ message: 'Purchase successful', purchases: purchaseResults });
    } catch (error) {
      // Log and handle any errors during purchase creation
      console.error('Error during purchase:', error.message);
      res.status(500).json({ message: 'Purchase failed', error: error.message });
    }
  };
  


  // Controller to fetch user information and their purchases
  const getUserPurchases = async (req, res) => {
    const userId = req.params.userId; // Assuming the userId is passed as a route parameter
  
    try {
      // Fetch user details from Supabase
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('id', userId)
        .single();
  
      if (userError) {
        return res.status(400).json({ message: 'Error fetching user data', error: userError.message });
      }
  
      // Fetch user purchases from Supabase
      const { data: purchases, error: purchaseError } = await supabase
        .from('purchases')
        .select('product_id, quantity, total_amount, purchase_date')
        .eq('user_id', userId);
  
      if (purchaseError) {
        return res.status(400).json({ message: 'Error fetching purchases', error: purchaseError.message });
      }
  
      // Return both user data and purchases in the response
      res.status(200).json({
        user,
        purchases,
      });
    } catch (error) {
      console.error('Error fetching user purchases:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  


module.exports = { handlePurchase ,getUserPurchases };
