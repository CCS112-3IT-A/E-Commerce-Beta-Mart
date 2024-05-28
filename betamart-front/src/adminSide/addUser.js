import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const AddUser = ({ onAddUser }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');

  const handleClose = () => {
    setShow(false);
    setError('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const newUser = await response.json();
          console.log('User added successfully');
          onAddUser(newUser); // Call the callback function with the new user data
          setEmail('');
          setPassword('');
          setRetypePassword('');
          handleClose(); // Close the modal
        } else {
          console.error('Failed to add user');
          setError('Failed to add user');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred');
      }
    };

    return (
        <>
          <Button variant="primary" onClick={handleShow} className="mb-3">
            Add User
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>