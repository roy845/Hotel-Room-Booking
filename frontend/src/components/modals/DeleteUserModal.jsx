import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteUserModal = ({ open, setOpen, handleDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h2>Delete user</h2>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center">
          Are you sure you want to delete the user ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
