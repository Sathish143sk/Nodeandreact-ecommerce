import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid #dee2e6",
      }}
    >
      <h5 className="mb-4">Admin Panel</h5>
      <Nav className="flex-column">
        <Nav.Link href="/admin">Dashboard</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/category">
          Category
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/products">
          Products
        </Nav.Link>
        <Nav.Link as={NavLink} to={"/admin/orders"}>
          Orders
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/users">
          Users
        </Nav.Link>
        <Nav.Link href="/">Back to Store</Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
