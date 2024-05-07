// quantity.js
import React from 'react';
import { Button } from 'react-bootstrap';

const QuantityControl = ({
  productId,
  initialQuantity = 1,
  productPrice,
  cartItems,
  setCartItems,
  setQuantity,
}) => {
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (initialQuantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleDecrement} disabled={initialQuantity === 1}>
        -
      </Button>
      <span style={{ padding: '0 10px' }}>{initialQuantity}</span>
      <Button variant="primary" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
};

export default QuantityControl;