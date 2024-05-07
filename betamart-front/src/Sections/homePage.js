import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="mb-5 justify-content-center">
        <Container>
          <Navbar.Brand href="#" className="mx-auto">
            BetaMart
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="text-center py-5 mt-5">
        <h1 className="display-4 mb-4">Welcome to BetaMart</h1>
        <p className="lead mb-4">
          Your one-stop destination for all your electronic needs. <br /> Explore our wide range of
          products and find the perfect fit for your lifestyle.
        </p>
        <Link to="/shop">
          <Button variant="primary" size="lg">
            Go to Shop
          </Button>
        </Link>
      </Container>
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <div className="text-center">
              <i className="fas fa-truck fa-3x mb-3"></i>
              <h3>Fast Delivery</h3>
              <p>We offer fast and reliable delivery options for your convenience.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <i className="fas fa-shield-alt fa-3x mb-3"></i>
              <h3>Secure Payment</h3>
              <p>Your payment information is safe with our secure payment gateway.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <i className="fas fa-headset fa-3x mb-3"></i>
              <h3>24/7 Support</h3>
              <p>Our customer support team is available 24/7 to assist you.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;