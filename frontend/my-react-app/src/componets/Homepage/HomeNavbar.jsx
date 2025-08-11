import React from "react";
import { Navbar, Container, Form, FormControl, Nav, Badge } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser, FaStore, FaEllipsisV } from "react-icons/fa";

const FlipkartNavbar = () => {
  return (
    <Navbar bg="white" className="shadow-sm py-2" expand="lg" fixed="top">
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="/assets/log.png" // Place Flipkart-like logo in public/assets
            alt="ShopAlter  "
            style={{ height: "60px" }}
          />
          <small className="ms-1" style={{ fontSize: "12px", color: "#9e9e9e" }}>
            Explore <span style={{ color: "#ffe500", fontWeight: "bold" }}>Plus ✨</span>
          </small>
        </Navbar.Brand>

        {/* Search Bar */}
        <Form className="d-flex flex-grow-1 mx-3">
          <div
            style={{
              backgroundColor: "#f0f5ff",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "5px 10px",
            }}
          >
            <FaSearch style={{ color: "gray", marginRight: "8px" }} />
            <FormControl
              type="search"
              placeholder="Search for Products, Brands and More"
              className="border-0 bg-transparent"
              style={{ outline: "none", boxShadow: "none" }}
            />
          </div>
        </Form>

        {/* Right Side */}
        <Nav className="align-items-center">
          <Nav.Link href="#" className="d-flex align-items-center text-dark mx-2">
            <FaUser className="me-1" /> sathish ▾
          </Nav.Link>
          <Nav.Link href="#" className="d-flex align-items-center text-dark mx-2">
            <div style={{ position: "relative" }}>
              <FaShoppingCart className="me-1" size={20} />
              <Badge bg="danger" pill style={{ position: "absolute", top: "-8px", right: "-10px" }}>
                13
              </Badge>
            </div>
            Cart
          </Nav.Link>
          <Nav.Link href="#" className="d-flex align-items-center text-dark mx-2">
            <FaStore className="me-1" /> Become a Seller
          </Nav.Link>
          <Nav.Link href="#" className="text-dark mx-2">
            <FaEllipsisV />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default FlipkartNavbar;
