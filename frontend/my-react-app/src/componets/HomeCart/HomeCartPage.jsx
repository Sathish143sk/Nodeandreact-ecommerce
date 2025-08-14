// frontend/src/pages/CartPage.jsx
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

  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!token || !userId) return;

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/cart/getCartByUserId/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const items = data.items || [];
        setCartItems(items);

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

    const fetchAddress = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/address/getUserAddresses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.length > 0) {
          setAddress(data[0]);
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };

    fetchCart();
    fetchAddress();
  }, [token, userId]);

  // Save or update address in backend
  const handleAddressChange = async () => {
    try {
      const payload = { ...newAddress };

      if (address) {
        // Update
        await axios.put(
          `http://localhost:5000/api/user/address/updateAddress/${address._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddress({ ...payload, _id: address._id });
      } else {
        // Create
        const { data } = await axios.post(
          "http://localhost:5000/api/user/address/addAddress",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddress(data.address); // data.address contains the saved object
      }

      setShowAddressForm(false);
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  const handleAddressDelete = async () => {
    if (!address?._id) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/user/address/deleteAddress/${address._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddress(null);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Left side: Address + Cart */}
        <Col
          md={8}
          style={{ display: "flex", flexDirection: "column", height: "80vh" }}
        >
          {/* Address */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              {address ? (
                <>
                  <h5>Delivery Address</h5>
                  <strong>Deliver to:</strong> {address.fullName},{" "}
                  {address.postalCode}
                  <br />
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="float-end ms-2"
                    onClick={() => {
                      setNewAddress({ ...address });
                      setShowAddressForm(true);
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="float-end"
                    onClick={handleAddressDelete}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Alert variant="info">
                  No address found.
                  <Button
                    variant="link"
                    className="p-0 ms-2"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Add Address
                  </Button>
                </Alert>
              )}

              {showAddressForm && (
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Full Name"
                    value={newAddress.fullName}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, fullName: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Phone Number"
                    value={newAddress.phoneNumber}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Street / Address Details"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  ></textarea>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postalCode: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                  />
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                      id="defaultAddress"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="defaultAddress"
                    >
                      Set as default address
                    </label>
                  </div>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleAddressChange}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Cart Items */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            <h2>Cart items:</h2>
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
                          <Button variant="outline-secondary" size="sm">
                            -
                          </Button>
                          <div className="mx-3">{item.quantity}</div>
                          <Button variant="outline-secondary" size="sm">
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
                          <Button variant="outline-danger" size="sm">
                            REMOVE
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Col>

        {/* Right side: Price details */}
        <Col
          md={4}
          style={{ position: "sticky", top: "20px", height: "fit-content" }}
        >
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
