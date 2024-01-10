import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteRoomModal = ({ open, setOpen, handleDelete, roomId }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h2>Delete room</h2>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center">
          Are you sure you want to delete room with id {roomId}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete(roomId);
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRoomModal;
