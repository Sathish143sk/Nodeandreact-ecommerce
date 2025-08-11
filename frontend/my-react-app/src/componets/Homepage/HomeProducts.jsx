import React, { useRef } from "react";
import { Carousel, Card } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = [
  {
    name: "Motorola G85 5G",
    price: "from 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Motorola G45 5G",
    price: "From 10999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Vivo T4 5G",
    price: "from 20499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Realme P3 5G",
    price: "From 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Oppo K13 5G",
    price: "from 16499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "POCO F7 5G",
    price: "from 29999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Motorola G85 5G",
    price: "from 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Motorola G45 5G",
    price: "From 10999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Vivo T4 5G",
    price: "from 20499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Realme P3 5G",
    price: "From 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Oppo K13 5G",
    price: "from 16499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "POCO F7 5G",
    price: "from 29999*",
    image: "https://via.placeholder.com/150x200",
  },
];

const productsSection = () => {
  const carouselRef = useRef(null);

  // Group categories into chunks of 6 per slide
  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);
  };

  const productsChunks = chunkArray(products, 6);

  return (
    <div
      className="my-4 position-relative"
      style={{ backgroundColor: "white", padding: "15px" }}
    >
      {/* Header with title & View All button */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h4 className="mb-0">Best Deals on Products</h4>
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
        {productsChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-4">
              {chunk.map((cat, i) => (
                <Card
                  key={i}
                  className="text-center border-1"
                  style={{ width: "200px", backgroundColor: "white" }}
                >
                  <Card.Img
                    variant="top"
                    src={cat.image}
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: "14px" }}>
                      {cat.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "13px", color: "red" }}>
                      {cat.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Prev Button */}
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

      {/* Custom Next Button */}
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

export default productsSection;
