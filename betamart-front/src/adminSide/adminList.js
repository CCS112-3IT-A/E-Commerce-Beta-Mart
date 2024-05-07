import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const AdminList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/list')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const highlightColor = (price) => {
    return price > 100 ? '#ffcccc' : ''; // Change color based on price
  };

  return (
    <Container>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr >
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDesc}</td>
              


            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminList;