import React, { useState, useEffect } from 'react';
import ProductBanner from '../../components/ProductBanner/ProductBanner';
import Cart from '../../components/Cart/Cart';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/ProductBanner/Searchbar';
import Checkout from '../../components/ProductBanner/Checkout'; // Import Checkout component
import axios from 'axios';

const Products = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]); // This will hold the fetched products
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://react-js-furniture-shop-5.onrender.com/api/products'); // Adjust the API endpoint as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    /*
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart); */
    setCartItems((prevItems) => [
      ...prevItems,
      {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url, // Make sure this is included
          quantity: 1, // or whatever the default quantity is
      },
  ]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const clearCart = () => {
    setCartItems([]); // Clear the cart
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div>
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductBanner
        addToCart={addToCart}
        toggleCart={toggleCart}
        prods={products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))} // Filter products based on search term
      />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        toggleCart={toggleCart}
        cartOpen={cartOpen}
        total={calculateTotal()}
        clearCart={clearCart} // Pass clearCart as a prop to Cart
      />
    </div>
  );
}

export default Products;

