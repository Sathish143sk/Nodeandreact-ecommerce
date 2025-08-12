import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [priceDetails, setPriceDetails] = useState({
    price: 0,
    discount: 0,
    coupon: 0,
    fee: 0,
    total: 0,
    saved: 0,
  });

  const userId = "6892e25dec344f47fbeeabad"; // Replace with logged-in user id dynamically

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get(
          `http://localhost:5000/api/user/cart/getCartByUserId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items = data.items || [];
        setCartItems(items);

        // Calculate price details
        const price = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const discount = 3229;
        const coupon = 29;
        const fee = 19;
        const total = price - discount - coupon + fee;
        const saved = discount + coupon;

        setPriceDetails({ price, discount, coupon, fee, total, saved });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  // Update quantity API call
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1

    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `http://localhost:5000/api/cart/${userId}/updateQuantity`,
        { productId, quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update state locally
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Recalculate price details after quantity update
      const updatedItems = cartItems.map((item) =>
        item.product === productId ? { ...item, quantity: newQuantity } : item
      );
      const price = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      const discount = 3229;
      const coupon = 29;
      const fee = 19;
      const total = price - discount - coupon + fee;
      const saved = discount + coupon;

      setPriceDetails({ price, discount, coupon, fee, total, saved });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item API call
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(
        `http://localhost:5000/api/user/cart/removeCartItem/${userId}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems((prev) => prev.filter((item) => item.product !== productId));

      // Recalculate price details after removal
      const updatedItems = cartItems.filter((item) => item.product !== productId);
      const price = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      const discount = 3229;
      const coupon = 29;
      const fee = 19;
      const total = price - discount - coupon + fee;
      const saved = discount + coupon;

      setPriceDetails({ price, discount, coupon, fee, total, saved });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          {/* Delivery Info */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <strong>Deliver to:</strong> Sathish Kumar P, 636809
              <br />
              26 sajjalaalli village, Papparapatti post, Pannagaram thalka, ...
              <Button variant="outline-primary" size="sm" className="float-end">
                Change
              </Button>
            </Card.Body>
          </Card>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
          ) : (
            cartItems.map((item) => (
              <Card key={item.product} className="mb-3 shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={2}>
                      <img
                        src={item.image || "default.png"}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col md={6}>
                      <h6>{item.name}</h6>
                      <div className="d-flex align-items-center mt-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.product, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <div className="mx-3">{item.quantity}</div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.product, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                        >
                          SAVE FOR LATER
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem(item.product)}
                        >
                          REMOVE
                        </Button>
                      </div>
                    </Col>
                    <Col md={4} className="text-end">
                      <h5>₹{item.price * item.quantity}</h5>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        {/* Price Details */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">PRICE DETAILS</h6>
              <div className="d-flex justify-content-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{priceDetails.price}</span>
              </div>
              <div className="d-flex justify-content-between text-success">
                <span>Discount</span>
                <span>- ₹{priceDetails.discount}</span>
              </div>
              <div className="d-flex justify-content-between text-success">
                <span>Coupons for you</span>
                <span>- ₹{priceDetails.coupon}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Protect Promise Fee</span>
                <span>₹{priceDetails.fee}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount</span>
                <span>₹{priceDetails.total}</span>
              </div>
              <div className="text-success small mt-2">
                You will save ₹{priceDetails.saved} on this order
              </div>
              <Button
                variant="warning"
                className="w-100 mt-3 fw-bold"
                style={{
                  color: "#fff",
                  backgroundColor: "#ff5722",
                  border: "none",
                }}
              >
                PLACE ORDER
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
