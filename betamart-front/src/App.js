import React, { useState } from 'react';

import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(true);
        setIsAdmin(data.email === 'admin@gmail.com');
      } else {
        const errorData = await response.json();
        handleShowModal(errorData.error);
        if (response.status === 404) {
          handleShowModal('User not found');
        } else if (response.status === 401) {
          handleShowModal('Wrong password');
        }
      }
    } catch (error) {
      handleShowModal('An error occurred during login');
    }
  };

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (!loggedIn) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Login handleLogin={handleLogin} handleShowModal={handleShowModal} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/" element={<AdminPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/Shop" element={<Shop />} />
          </>
        )}
      </Routes>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Router>
  );
}

function Login({ handleLogin, handleShowModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="bg-light p-5 rounded-3 shadow">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}
   
  

export default App;