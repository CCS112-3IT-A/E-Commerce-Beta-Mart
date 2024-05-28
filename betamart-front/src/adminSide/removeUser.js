import { Modal, Button } from 'react-bootstrap';
import { FaUserTimes } from 'react-icons/fa';

const DeleteUser = ({ user, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/removeUser/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(user.id);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
      } else {
        const error = await response.json();
        console.error('Failed to delete user:', error.error);
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
        <FaUserTimes />
      </Button>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>The user has been deleted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;