import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteBookingModal = ({ open, setOpen, handleDelete, bookingId }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h2>Delete booking</h2>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center">
          Are you sure you want to delete booking with id {bookingId}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete(bookingId);
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBookingModal;
