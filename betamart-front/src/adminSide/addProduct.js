import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddProduct = ({ onAddProduct }) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productPrice, productDesc }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('Product added successfully');
        onAddProduct(newProduct); // Call the callback function with the new product data
        setProductName('');
        setProductPrice('');
        setProductDesc('');
        handleClose(); // Close the modal
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Product
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>