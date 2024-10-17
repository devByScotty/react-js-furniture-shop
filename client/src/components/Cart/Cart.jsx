import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Drawer,
    Divider,
    Button,
    Modal,
    Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, toggleCart, cartOpen, total, clearCart }) => {
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    // Open/Close checkout modal
    const handleOpenCheckout = () => setCheckoutOpen(true);
    const handleCloseCheckout = () => setCheckoutOpen(false);

    // Update your handleConfirmPurchase function in the Cart component
    const handleConfirmPurchase = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const image_url = localStorage.getItem('image_url');
    
        if (!token || !userId) {
            setSnackbarMessage('You need to be logged in to complete a purchase');
            setSnackbarOpen(true);
            return;
        }
    
        const purchaseData = cartItems.map((item) => ({
            userId,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            imageUrl: image_url || item.image_url, // Ensure this is correctly mapped
        }));
    
       
    
        console.log('Purchase Data Sent:', { purchases: purchaseData, totalAmount: total });
    
        try {
            const response = await fetch('https://react-js-furniture-shop-5.onrender.com/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ purchases: purchaseData, totalAmount: total }),
            });
    
            const result = await response.json();
            console.log('API Response:', result);
    
            if (response.ok) {
                setSnackbarMessage('Purchase successful!');
                clearCart();
                navigate('/order-confirmation', { state: { purchaseData, totalAmount: total } }); // Navigate with data
                setPurchaseConfirmed(true);
                setCheckoutOpen(false);
            } else {
                setSnackbarMessage(result.message || 'Purchase failed');
            }
        } catch (error) {
            console.error('Error making purchase:', error);
            setSnackbarMessage('There was an error with your purchase. Please try again.');
        } finally {
            setSnackbarOpen(true);
        }
    };
    


    return (
        <>
            {/* Cart Drawer */}
            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
                <Box sx={{ width: 300, padding: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Shopping Cart
                    </Typography>
                    <Divider />

                    {!purchaseConfirmed ? (
                        <>
                            <List sx={{ marginTop: 2 }}>
                                {cartItems.length === 0 ? (
                                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                                        Your cart is empty.
                                    </Typography>
                                ) : (
                                    cartItems.map((item) => (
                                        <ListItem key={item.id} disableGutters sx={{ paddingBottom: 1 }}>
                                            <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                )}
                            </List>
                            {cartItems.length > 0 && (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                        <Typography variant="h6">Total:</Typography>
                                        <Typography variant="h6">${total.toFixed(2)}</Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpenCheckout} // Open the checkout modal
                                        sx={{
                                            width: '100%',
                                            marginTop: 2,
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            backgroundColor: '#5C8659',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#4a6d47',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        Checkout
                                    </Button>
                                </>
                            )}
                        </>
                    ) : (
                        // Success message and tick icon after purchase confirmation
                        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                            <CheckCircleIcon sx={{ fontSize: 60, color: 'green' }} />
                            <Typography variant="h5" sx={{ marginTop: 2 }}>
                                Purchase Confirmed!
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Drawer>

            {/* Checkout Modal */}
            <Modal
                open={isCheckoutOpen}
                onClose={handleCloseCheckout}
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="checkout-modal-title" variant="h6" component="h2">
                        Confirm Your Purchase
                    </Typography>
                    <Typography id="checkout-modal-description" sx={{ mt: 2 }}>
                        Your total is ${total.toFixed(2)}. Are you sure you want to complete the purchase?
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleConfirmPurchase}>
                            Confirm Purchase
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseCheckout}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Feedback Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={<Button color="inherit" onClick={() => setSnackbarOpen(false)}>Close</Button>}
            />
        </>
    );
};

export default Cart;
