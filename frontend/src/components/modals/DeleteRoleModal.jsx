import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteRole } from "../utils/ApiFunctions";

const DeleteRoleModal = ({
  open,
  setOpen,
  roleId,
  fetchAgain,
  setFetchAgain,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handledDeleteRole = async () => {
    try {
      const { data } = await deleteRole(roleId);
      setSuccessMessage("Role deleted successfully");
      setFetchAgain(!fetchAgain);
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h2>Delete role</h2>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center">
          Are you sure you want to delete role with id {roleId}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handledDeleteRole}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRoleModal;
