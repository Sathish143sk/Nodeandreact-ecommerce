import React from "react";

const categories = [
  { name: "Minutes", image: "https://via.placeholder.com/60x60" },
  { name: "Mobiles & Tablets", image: "https://via.placeholder.com/60x60" },
  {
    name: "Fashion",
    image: "https://via.placeholder.com/60x60",
    dropdown: true,
  },
  {
    name: "Electronics",
    image: "https://via.placeholder.com/60x60",
    dropdown: true,
  },
  {
    name: "Home & Furniture",
    image: "https://via.placeholder.com/60x60",
    dropdown: true,
  },
  { name: "TVs & Appliances", image: "https://via.placeholder.com/60x60" },
  { name: "Flight Bookings", image: "https://via.placeholder.com/60x60" },
  {
    name: "Beauty, Food..",
    image: "https://via.placeholder.com/60x60",
    dropdown: true,
  },
  { name: "Grocery", image: "https://via.placeholder.com/60x60" },
];

const CategoryNav = () => {
  return (
    <div style={styles.container}>
      {categories.map((cat, index) => (
        <div key={index} style={styles.item}>
          <img src={cat.image} alt={cat.name} style={styles.image} />
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
    marginTop:"20px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
    color: "#000",
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
