import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const UpdateProduct = ({ product, onUpdate, onClose }) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductDesc(product.productDesc);
    }
  }, [product]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateProduct/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productPrice, productDesc }),
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdate(updatedProduct);
        console.log('Product updated successfully');
        handleClose();
      } else {
        const error = await response.json();
        console.error('Failed to update product:', error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (product) {
      handleShow();
    }
  }, [product]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formProductDesc">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProduct;