// src/pages/OrderConfirmation.js

import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const OrderConfirmation = () => {
    const location = useLocation();
    const { purchaseData, totalAmount } = location.state || { purchaseData: [], totalAmount: 0 };

    console.log('Order Confirmation Data:', purchaseData); // Log to verify

    return (
<>
        <Navbar />
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Order Confirmation</Typography>
            {purchaseData.length > 0 ? (
                <Grid container spacing={2}>
                    {purchaseData.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.productId}>
                            <Card sx={{ width: 350, margin: 1 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={item.imageUrl} // Access imageUrl correctly
                                    alt={item.name}
                                    sx={{
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': { transform: 'translateY(-5px)' },
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        R {item.price.toFixed(2)} x {item.quantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1">No items in your order.</Typography>
            )}
            <Typography variant="h6" sx={{ marginTop: 2 }}>Total Amount: R {totalAmount.toFixed(2)}</Typography>
        </Box>
        </>
    );
};

export default OrderConfirmation;
