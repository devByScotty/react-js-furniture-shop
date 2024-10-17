const supabase = require('../config'); // Ensure this is correctly configured



const createPurchase = async (userId, productId, quantity, totalAmount) => {
  try {
    console.log('Data being inserted:', { userId, productId, quantity, totalAmount });

    const { data, error } = await supabase
      .from('purchases')
      .insert([{ 
        user_id: userId, 
        product_id: productId, 
        quantity: quantity, 
        total_amount: totalAmount 
      }]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;  // Ensure you throw the error to catch it later
    }

    console.log('Data returned from Supabase:', data);
    return data;
  } catch (err) {
    console.error('Error during purchase:', err);
  }
};



module.exports = { createPurchase };


