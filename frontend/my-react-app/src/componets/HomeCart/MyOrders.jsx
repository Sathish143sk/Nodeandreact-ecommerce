// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import HomeNavbar from "../Homepage/HomeNavbar";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/myOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching your orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (orders.length === 0)
    return <Alert variant="info">You have no orders yet.</Alert>;

  return (
    <div>
      <HomeNavbar />
      <div className="contendpage">
        <Container>
          <h2>My Orders</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Username</th>
                <th>Shipping Address</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Action</th>
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
                  <td>₹{order.totalPrice}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="primary" size="sm">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default MyOrders;
