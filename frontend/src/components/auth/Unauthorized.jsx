import React from "react";
import { Card } from "react-bootstrap";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card>
        <Card.Header style={{ backgroundColor: "#f44336", color: "#fff" }}>
          <Card.Title as="h4" className="text-center">
            Unauthorized
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column align-items-center">
          <FaLock style={{ fontSize: 48, marginBottom: 2, color: "#f44336" }} />
          <Card.Text className="mt-3">
            You do not have permission to access this page.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Unauthorized;
