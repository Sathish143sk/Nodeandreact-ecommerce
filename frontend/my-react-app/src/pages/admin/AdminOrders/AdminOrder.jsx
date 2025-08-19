// src/pages/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import AdminSidebar from "../../../componets/AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Admin actions
  const handleMarkPaid = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // refresh list
    } catch (err) {
      alert("Failed to mark as paid");
    }
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // refresh list
    } catch (err) {
      alert("Failed to mark as delivered");
    }
  };

  // ✅ Fetch all orders for admin
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders/getUSerOrders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (orders.length === 0)
    return (
      <Container className="mt-5">
        <Alert variant="info">No orders placed yet.</Alert>
      </Container>
    );

  return (
    <Container style={{ marginLeft: "220px", padding: "30px" }}>
      <div className="d-flex">
        <AdminSidebar />
        <div className=" ms-5">
          <h2 className="mb-4">All Orders (Admin)</h2>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Shipping Address</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || "N/A"}</td>
                  <td>
                    {order.shippingAddress
                      ? `${order.shippingAddress.fullName}, ${order.shippingAddress.phoneNumber}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`
                      : "N/A"}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  <td className="d-flex flex-wrap gap-2">
                    <Link to={`/admin/order/${order._id}`}>
                      <Button variant="primary" size="sm">
                        Details
                      </Button>
                    </Link>
                    {!order.isPaid && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleMarkPaid(order._id)}
                      >
                        Mark Paid
                      </Button>
                    )}
                    {!order.isDelivered && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleMarkDelivered(order._id)}
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AdminOrders;
