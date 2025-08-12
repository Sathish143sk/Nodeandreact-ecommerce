import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/userLogin",
        form
      );
      console.log("Login response:", res.data);
      localStorage.setItem("userToken", res.data.token); // store token
      localStorage.setItem("userId", res.data._id);
      setMessage("Login successful!");
      navigate("/user/profile");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {message && <Alert>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
