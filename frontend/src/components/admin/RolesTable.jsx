import React, { useState } from "react";
import { Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteRoleModal from "../modals/DeleteRoleModal";

const RolesTable = ({
  roles,
  fetchAgain,
  setFetchAgain,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete role
    </Tooltip>
  );

  return (
    <>
      <section className="mt-5 container">
        <div className="d-flex justify-content-between mt-5">
          <h2>Roles</h2>
          <Row>
            <Link to={"/add-role"} className="text-decoration-none">
              <FaPlus />
              <span> Add role</span>
            </Link>
          </Row>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Role Name</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="text-center">
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td className="">
                  <OverlayTrigger
                    placement="auto-end"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedRole(role.id);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {openDeleteModal && (
        <DeleteRoleModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          roleId={selectedRole}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </>
  );
};

export default RolesTable;
