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

  // Bulk import state
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkMsg, setBulkMsg] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          "http://localhost:5000/api/admin/category/getAllCategory",
          {
            headers: { Authorization: `Bearer ${token}` },
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

  const handleBulkFileChange = (e) => {
    setBulkFile(e.target.files[0]);
    setBulkMsg("");
  };

  // Bulk import submit handler
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setBulkMsg("");

    if (!bulkFile) {
      setBulkMsg("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setBulkMsg("You must be logged in as admin to import products.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("csvFile", bulkFile); // field name must match Multer

      const response = await axios.post(
        "http://localhost:5000/api/admin/product/bulkImportProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBulkMsg("Bulk products imported successfully!");
      setBulkFile(null);
      e.target.reset();
      console.log("Bulk import response:", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setBulkMsg(`Import error: ${error.response.data.message}`);
      } else {
        setBulkMsg(`Import error: ${error.message}`);
      }
      console.error("Bulk import error:", error);
    }
  };

  // Single product submit handler
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
      formData.append("category", product.category);
      formData.append("countInStock", product.countInStock);
      if (imageFile) formData.append("image", imageFile); // field name must match Multer

      const response = await axios.post(
        "http://localhost:5000/api/admin/product/addProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMsg("Product added successfully!");
      navigate("/admin/products");
      console.log("Created product:", response.data);

      // Reset form
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
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.message);
      }
      console.error("Add product error:", error);
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <h3 className="mb-4 text-center">Add New Product / Bulk Import</h3>
      <Row>
        {/* Bulk Import */}
        <Col
          md={5}
          style={{ borderRight: "1px solid #ddd", paddingRight: "2rem" }}
        >
          <h5>Bulk Import Products</h5>
          {bulkMsg && (
            <Alert
              variant={
                bulkMsg.startsWith("Import error") ? "danger" : "success"
              }
            >
              {bulkMsg}
            </Alert>
          )}
          <Form onSubmit={handleBulkSubmit} encType="multipart/form-data">
            <Form.Group controlId="bulkFile" className="mb-3">
              <Form.Label>Upload CSV / Excel File</Form.Label>
              <Form.Control
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleBulkFileChange}
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="submit"
              size="lg"
              className="w-100"
            >
              Import Products
            </Button>
          </Form>
        </Col>

        {/* Add Single Product */}
        <Col md={7} style={{ paddingLeft: "2rem" }}>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStock">
                  <Form.Label>Stock Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    name="countInStock"
                    value={product.countInStock}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter stock quantity"
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
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
