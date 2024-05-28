import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Card } from 'react-bootstrap';
import AdminList from './adminList';
import UserList from './userList';

const AdminPage = () => {
  const [activeButton, setActiveButton] = useState('Product');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Betamart Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Navigation</Card.Title>
                <Nav variant="pills" className="flex-column">
                  <Nav.Link
                    active={activeButton === 'Product'}
                    onClick={() => handleButtonClick('Product')}
                  >
                    Product
                  </Nav.Link>
                  <Nav.Link
                    active={activeButton === 'User'}
                    onClick={() => handleButtonClick('User')}
                  >
                    User
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  {activeButton === 'Product' ? 'Admin Product List' : 'Admin User List'}
                </Card.Title>
                {activeButton === 'Product' ? <AdminList /> : <UserList/>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;