import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";
import AdminSidebar from "../../../componets/AdminSidebar"; // ✅ Make sure folder name is correct!

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const token = localStorage.getItem("userToken");
    console.log("userToken from localStorage:", token);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <Container style={{ marginLeft: "220px", padding: "30px" }}>
        <h3 className="mb-4">User List</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2">
                    View
                  </Button>
                  <Button variant="warning" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserList;
