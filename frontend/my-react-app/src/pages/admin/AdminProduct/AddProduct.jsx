import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // or "token" if you use that
        const response = await axios.get(
          "http://localhost:5000/api/admin/category/getAllCategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMsg("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.countInStock
    ) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setErrorMsg("You must be logged in as admin to add a product.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category); // this is category _id now
      formData.append("countInStock", product.countInStock);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(
        "http://localhost:5000/api/admin/product/addProduct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // No Content-Type here for FormData
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await response.json();
      setSuccessMsg("Product added successfully!");
      navigate("/admin/products");
      console.log("Created product:", data);

      // Reset form fields
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
      });
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      setErrorMsg(error.message);
      console.error("Add product error:", error);
    }
  };

  return (
    <Container style={{ maxWidth: 600, marginTop: "2rem" }}>
      <h3 className="mb-4 text-center">Add New Product</h3>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price ($) *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formStock">
              <Form.Label>Stock Quantity *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                name="countInStock"
                value={product.countInStock}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category *</Form.Label>
          <Form.Select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit" size="lg">
            Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
