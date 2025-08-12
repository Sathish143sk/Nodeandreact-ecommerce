import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const userId = localStorage.getItem("userId");
        const res = await axios.get(
          `http://localhost:5000/api/user/getUserById/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");
      await axios.put(
        `http://localhost:5000/api/user/updateUser/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, ...formData });
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/user/login");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="border-0 shadow" style={{ overflow: "hidden" }}>
        <Row>
          {/* Left Gradient Section */}
          <Col
            md={4}
            className="text-white text-center p-4"
            style={{
              background: "linear-gradient(to bottom right, #f9a825, #f48fb1)",
            }}
          >
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ border: "4px solid white" }}
            />
            <h4>{user?.name}</h4>
            <p>{user?.role || "User"}</p>
            <Button variant="light" size="sm" onClick={() => setEditing(true)}>
              ✏ Edit Profile
            </Button>
          </Col>

          {/* Right Info Section */}
          <Col md={8} className="p-4">
            {editing ? (
              <>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
                <Button variant="success" className="me-2" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <h5>Information</h5>
                <hr />
                <Row>
                  <Col sm={6}>
                    <strong>Email:</strong> {user?.email}
                  </Col>
                  <Col sm={6}>
                    <strong>Phone:</strong> {user?.phone || "Not set"}
                  </Col>
                </Row>
                <div className="mt-4">
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProfilePage;
