import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import axios from "axios";
import AdminSidebar from "../../../componets/AdminSidebar";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log(localStorage.getItem("adminToken"));
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
      console.error(error);
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("adminToken");
    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:5000/api/admin/category/update/${editingCategory._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Category updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/category/addCategory ",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Category created successfully!");
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Error saving category");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setDescription(cat.description || "");
    setEditingCategory(cat);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/category/delete/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error(error);
        alert("Error deleting category");
      }
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setEditingCategory(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light min-vh-100">
          <AdminSidebar />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="mb-4">Category Management</h2>
          <Row>
            {/* ADD / EDIT FORM */}
            <Col md={4}>
              <Card className="p-3 shadow-sm">
                <h5>
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Category Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      {editingCategory ? "Update" : "Add"}
                    </Button>
                    {editingCategory && (
                      <Button variant="secondary" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </Form>
              </Card>
            </Col>

            {/* CATEGORY LIST TABLE */}
            <Col md={8}>
              <h5>All Categories</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td>
                        {cat.image && (
                          <img
                            src={`http://localhost:5000${cat.image}`}
                            alt={cat.name}
                            style={{
                              width: "80px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>{cat.name}</td>
                      <td>{cat.description}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleEdit(cat)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(cat._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryPage;
