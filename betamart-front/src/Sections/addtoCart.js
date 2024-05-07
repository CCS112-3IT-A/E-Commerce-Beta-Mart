// AddToCart.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { getProductInfo } from './productService';

const AddToCart = ({ productId, onAddToCart, setCart }) => {
  const handleClick = async () => {
    try {
      const productInfo = await getProductInfo(productId);
      onAddToCart(productInfo);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;