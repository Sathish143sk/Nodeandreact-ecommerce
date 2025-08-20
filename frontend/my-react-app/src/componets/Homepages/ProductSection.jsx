import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import "./ProductSection.css";

const ProductSection = ({ title, products }) => {
  return (
    <div className="product-section">
      {/* Section Header */}
      <div className="section-header">
        <h5>{title}</h5>
        <FaChevronRight className="arrow-icon" />
      </div>

      {/* Product Grid */}
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={3} sm={6} xs={12} className="mb-3">
            <Card className="product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-img"
              />
              <Card.Body>
                <Card.Title className="product-title">
                  {product.name}
                </Card.Title>
                <Card.Text className="product-offer">{product.offer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductSection;
