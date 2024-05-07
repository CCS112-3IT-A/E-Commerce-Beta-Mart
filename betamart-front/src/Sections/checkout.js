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
