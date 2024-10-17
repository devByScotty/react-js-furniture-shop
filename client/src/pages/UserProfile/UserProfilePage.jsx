import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/user/${userId}/purchases`);
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!userData) return <Alert severity="info">No data available</Alert>;

  const { user, purchases } = userData;

  return (
    <>
    <Navbar />
    <Container sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">User Info</Typography>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6">Purchases</Typography>
            {purchases.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Purchase Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchases.map((purchase) => (
                      <TableRow key={purchase.product_id}>
                        <TableCell>{purchase.product_id}</TableCell>
                        <TableCell>{purchase.quantity}</TableCell>
                        <TableCell>{purchase.total_amount}</TableCell>
                        <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No purchases found.</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
};

export default UserProfilePage;


