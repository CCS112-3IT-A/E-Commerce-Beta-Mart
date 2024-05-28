import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import UpdateProduct from './updateProduct';
import DeleteProduct from './deleteProduct';
import AddProduct from './addProduct';

const AdminList = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/list')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setShowUpdateModal(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const openUpdateModal = (product) => {
    setProductToUpdate(product);
    setShowUpdateModal(true);
  };

  return (
    <Container>
      <AddProduct onAddProduct={handleAddProduct} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDesc}</td>
              <td className="d-flex justify-content-center align-items-center px-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mr-2 px-3"
                  onClick={() => openUpdateModal(product)}
                >
                  <FaEdit />
                </Button>
                <DeleteProduct product={product} onDelete={handleDeleteProduct} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showUpdateModal && (
        <UpdateProduct
          product={productToUpdate}
          onUpdate={handleUpdateProduct}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </Container>
  );
};

export default AdminList;