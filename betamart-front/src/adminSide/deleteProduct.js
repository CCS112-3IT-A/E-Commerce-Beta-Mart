import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DeleteProduct = ({ product, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/removeProduct/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(product.id);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
      } else {
        const error = await response.json();
        console.error('Failed to delete product:', error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Button variant="outline-danger" size="sm" className="px-3" onClick={() => setShowConfirmModal(true)}>
        <FaTrashAlt />
      </Button>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>The product has been deleted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProduct;