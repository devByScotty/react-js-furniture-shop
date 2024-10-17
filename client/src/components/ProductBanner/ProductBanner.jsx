import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Pagination } from '@mui/material';
import axios from 'axios';

const ProductBanner = ({ addToCart, toggleCart,prods }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch product data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', padding: 2, cursor: 'pointer', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 2, marginBottom: 2, borderBottom: '1px solid gold' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, color: '#5C8659', fontFamily: 'Menlo', opacity: 0.9, textAlign: 'center' }}>
          Our Featured Products
        </Typography>
        <Button variant="contained" color="primary" sx={{ width: '100%', fontSize: '1rem', fontWeight: '600', backgroundColor: '#5C8659', color: '#fff', '&:hover': { backgroundColor: '#4a6d47', color: '#fff' } }} onClick={toggleCart}>
          Open Cart
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 2 }}>
        {displayedProducts.map(product => (
          <Card key={product.id} sx={{ width: 350, margin: 1 }}>
            <CardMedia
              component="img"
              height="350"
              image={product.image_url}
              alt={product.name}
              sx={{ objectFit: 'cover', borderRadius: 2, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)' } }}
            />
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: '1.2rem', marginBottom: 1, color: '#333' }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1, borderTop: '1px solid gold', borderBottom: '1px solid gold' }}>
                <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#666' }}>
                  R {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addToCart(product)}
                  sx={{
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
                  Add To Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ '& .MuiPaginationItem-root': { color: '#5C8659' ,backgroundColor: '#fff' }, '& .Mui-selected': { color: '#fff', backgroundColor: '#5C8659' } }}
        />
      </Box>
    </Box>
  );
};

export default ProductBanner;
