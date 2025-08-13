import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import AdminSidebar from "../../../componets/AdminSidebar";
import { Link } from "react-router-dom";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/product/getAllProduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Container style={{ marginLeft: "220px", padding: "30px" }}>
        <h2 className="mb-4">Manage Products</h2>
        <Link to="/admin/addProducts" style={{ textDecoration: "none" }}>
          <Button variant="primary" size="sm" className="me-2">
            Add Product
          </Button>
        </Link>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{product.category?.name || "No Category"}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/products/${product.image}`}
                      alt={product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    {/* Edit Button */}
                    <Link to={`/admin/updateProducts/${product._id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        Edit
                      </Button>
                    </Link>

                    {/* View Button */}
                    <Link to={"/admin/product"}>
                      <Button variant="primary" size="sm" className="me-2">
                        View
                      </Button>
                    </Link>

                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default ProductsPage;
