import React, { useState } from 'react';
import { Button, Modal, Table, Form, Container, Row, Col } from 'react-bootstrap';
import Checkout from './checkout';

const ViewCart = ({ cartItems = [], updateQuantity, removeFromCart, addToCart }) => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartResetKey, setCartResetKey] = useState(0); // Add a state variable to trigger cart reset

  const handleOpenCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleQuantityChange = (item, quantity) => {
    updateQuantity(item, quantity);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderSuccess = () => {
    console.log("Order successfully placed!");
  };

  return (
    <Container>
      <Row className="justify-content-end mb-4">
        <Col xs="auto">
          <Button variant="primary" onClick={handleOpenCart} className="mr-2">
            View Cart ({cartItems.length})
          </Button>
        </Col>
      </Row>

      <Modal show={showCart} onHide={handleCloseCart} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      {showCheckout && (
        <Checkout
          key={cartResetKey}
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </Container>
  );
};

export default ViewCart;