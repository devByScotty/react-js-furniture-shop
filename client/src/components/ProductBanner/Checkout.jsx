import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const Checkout = ({cartItems,clearCart,total}) => {
  // cart is now defaulting to an empty array if it's not passed or undefined

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Divider />
      
      <List>
        {total.length > 0 ? (
          cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        )}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Typography variant="h6">Total: {total}</Typography>
        <Typography variant="h6">${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2, fontSize: '1rem', fontWeight: '600' }}
      >
        Confirm Purchase
      </Button>
    </Box>
  );
};

export default Checkout;


