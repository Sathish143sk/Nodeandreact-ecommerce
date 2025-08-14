import React, { useRef, useEffect, useState } from "react";
import { Carousel, Card, Spinner, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const UserProductsCarousel = () => {
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cart, setCart] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/getUserProducts",
          { headers: { "Cache-Control": "no-cache" } }
        );

        const visibleProducts = response.data.filter(
          (p) => p.isVisible !== false && p.category?.name === "Mobile"
        );

        setProducts(visibleProducts);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
        setErrorMsg("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  // Fetch cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/cart/getCartByUserId/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(res.data.items || []);
        localStorage.setItem("cart", JSON.stringify(res.data.items || []));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to Cart handler
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/user/cart/addToCart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Item added to cart!");
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("❌ Failed to add item to cart");
    }
  };

  // Group products into chunks for carousel
  const chunkArray = (arr, size) =>
    arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);

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
        <h4 className="mb-0">Mobile Best Deals</h4>
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
                      ₹{prod.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(prod)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Left Arrow */}
      <button
        onClick={() =>
          document.querySelector(".carousel-control-prev")?.click()
        }
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

      {/* Right Arrow */}
      <button
        onClick={() =>
          document.querySelector(".carousel-control-next")?.click()
        }
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

export default UserProductsCarousel;
