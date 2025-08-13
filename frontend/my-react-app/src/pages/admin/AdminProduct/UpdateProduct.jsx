import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams(); // Product ID from URL
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
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const prodRes = await axios.get(
          `http://localhost:5000/api/admin/product/getProductById/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProduct(prodRes.data);

        const catRes = await axios.get(
          "http://localhost:5000/api/admin/category/getAllCategory",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(catRes.data);
      } catch (error) {
        setErrorMsg("Failed to load product or categories");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

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

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("countInStock", product.countInStock);
      formData.append("category", product.category);
      if (imageFile) formData.append("image", imageFile);

      const response = await axios.put(
        `http://localhost:5000/api/admin/product/updateProduct/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMsg("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <Container style={{ marginTop: "2rem", maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Edit Product</h3>
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
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Stock Quantity *</Form.Label>
          <Form.Control
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={handleChange}
            required
          />
        </Form.Group>

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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminEditProduct;
