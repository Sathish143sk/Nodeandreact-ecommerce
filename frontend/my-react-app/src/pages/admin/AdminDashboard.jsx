import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../componets/AdminSidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔐 Admin Auth Check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ marginLeft: "220px", width: "100%", padding: "30px" }}>
        <h2 className="mb-4">Welcome, Admin 👋</h2>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Products</Card.Title>
                <Card.Text>Manage all products in the store.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <Card.Text>Track and fulfill orders.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>View and manage users.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
