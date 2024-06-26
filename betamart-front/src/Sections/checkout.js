import React, { useState } from 'react';
import { Modal, Form, Button, Card } from 'react-bootstrap';

const Checkout = ({ cartItems, onClose, onOrderSuccess }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Address:", address);
    console.log("Cart Items:", cartItems);
    
    // Simulate order processing (replace setTimeout with actual API call)
    setTimeout(() => {
      setOrderPlaced(true);
      onOrderSuccess(); // Callback to reset ViewCart component
    }, 2000);
  };
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Modal show={true} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderPlaced ? (
          <div>
            <p>Order successful!</p>
          </div>
        ) : (
          <div>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />

                </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" value={address} onChange={handleAddressChange} />
              </Form.Group>
            </Form>
            <hr />
            <h4>Cart Items:</h4>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            <p>Total Price: ${totalPrice}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {!orderPlaced && (
          <Button variant="primary" onClick={handleSubmit} disabled={!name || !address}>
            Place Order
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;