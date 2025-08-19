import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      // If the endpoint is public, you can remove the token
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/category/getUserCategorys",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading categories...</p>;
  }
  // http://localhost:5000/uploads/products/${cat.image}
  return (
    <div style={styles.container}>
      {categories.map((cat, index) => (
        <div key={index} style={styles.item}>
          <img
            src={`http://localhost:5000/uploads/categories/${cat.image}`}
            alt={cat.name}
            style={styles.image}
          />
          <div style={styles.label}>
            {cat.name} {cat.dropdown && <span style={styles.arrow}>▼</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "white",
    padding: "15px 10px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
    color: "#000",
    margin: "10px",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    marginBottom: "5px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontWeight: 500,
  },
  arrow: {
    fontSize: "10px",
  },
};

export default CategoryNav;
