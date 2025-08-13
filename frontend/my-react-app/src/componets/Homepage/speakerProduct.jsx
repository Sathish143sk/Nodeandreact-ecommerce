import React, { useRef, useEffect, useState } from "react";
import { Carousel, Card, Spinner } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const UserLaptopCarousel = () => {
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        // Public endpoint, no token required if backend allows
        const response = await axios.get(
          "http://localhost:5000/api/product/getUserProducts",
          { headers: { "Cache-Control": "no-cache" } }
        );

        // Optional: filter only visible products if backend sends a flag
        const visibleProducts = response.data.filter(
          (p) => p.isVisible !== false && p.category.name === "Speaker"
        );

        setProducts(visibleProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
        setErrorMsg("Failed to load products");
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);
  };

  const productChunks = chunkArray(products, 6);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (errorMsg) return <p className="text-danger text-center">{errorMsg}</p>;

  return (
    <div
      className="my-4 position-relative"
      style={{ backgroundColor: "white", padding: "15px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h4 className="mb-0">speaker Best Deals</h4>
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          View All
        </button>
      </div>

      <Carousel
        ref={carouselRef}
        indicators={false}
        controls={false}
        interval={null}
      >
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              {chunk.map((prod, i) => (
                <Card
                  key={i}
                  className="text-center border-1"
                  style={{ width: "200px", backgroundColor: "white" }}
                >
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: "14px" }}>
                      {prod.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "13px", color: "red" }}>
                      {prod.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <button
        onClick={() => carouselRef.current.prev()}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "white",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          padding: "10px",
        }}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => carouselRef.current.next()}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "white",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          padding: "10px",
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default UserLaptopCarousel;
