import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AddToCart from './addtoCart';
import ViewCart from './viewCart';

const ProductListing = () => {


    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/list')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);
  
    const addToCart = (product) => {
      setCart(prevCart => [...prevCart, product]);
    };
  
    const updateQuantity = (product, quantity) => {
      setCart(prevCart =>
        prevCart.map(item => (item.id === product.id ? { ...item, quantity: quantity } : item))
      );
    };
  
    const removeFromCart = (product) => {
      setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    };
  
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <ViewCart
            cartItems={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        </Col>
      </Row>
      <Row>
        {products.map(product => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="h-100 product-card">
              <Card.Img
                variant="top"
                src={`https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDwNDJW1dlvxNTfneZIp-Xxjk-uQ45qK9hHml2Q7L9qkSFY-8NvWkm37TyznIgUQbBtAMTopeKeJLxgvHql-aJiIdSWqzH_Br7ZPYSlGR5gXEuKHPdRw5O&usqp=CAE`}
                alt="Computer"
              />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>${product.productPrice}</Card.Text>
                <Card.Text>{product.productDesc}</Card.Text>
                <AddToCart
                  productId={product.id}
                  onAddToCart={addToCart}
                  setCart={setCart}
                  className="btn-block"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListing;