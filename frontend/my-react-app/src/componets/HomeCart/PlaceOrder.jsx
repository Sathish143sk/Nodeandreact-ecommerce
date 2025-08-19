import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default Cash on Delivery

  const token = localStorage.getItem("userToken");

  // ✅ Load cart from localStorage dynamically
  useEffect(() => {
    const fetchCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);

      const total = storedCart.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 0;
        return acc + price * qty;
      }, 0);

      setTotalAmount(total);
    };

    // Fetch immediately
    fetchCart();

    // Optional: listen to localStorage changes from other tabs
    const handleStorageChange = () => fetchCart();
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fetch user addresses
  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/address/getUserAddresses",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.length > 0) {
          setAddress(data[0]); // select first address for now
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };
    fetchAddress();
  }, [token]);

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    try {
      if (!cart.length) {
        alert("Cart is empty!");
        return;
      }
      if (!address?._id) {
        alert("Please select a saved shipping address.");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/orders/place",
        {
          orderItems: cart.map((item) => ({
            product: item._id || item.product, // always send productId
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: address._id, // ✅ send only address ID
          totalPrice: totalAmount, // ✅ number
          paymentMethod, // COD / UPI / Card
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      navigate("/myorders", { state: { order: data } });
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Review Your Order</h2>

      {/* Address Section */}
      <div className="card p-3 mt-3">
        <h5>Shipping Address</h5>
        {address ? (
          <p>
            {address.fullName}, {address.phoneNumber}, {address.street},{" "}
            {address.city}, {address.state} - {address.postalCode}
          </p>
        ) : (
          <p>No address found</p>
        )}
      </div>

      {/* Cart Section */}
      <div className="card p-3 mt-3">
        <h5>Order Items</h5>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="d-flex justify-content-between">
              <span>
                {item.name} x {item.quantity} @ ₹{item.price}
              </span>
              <span>= ₹{item.price * item.quantity}</span>
            </div>
          ))
        ) : (
          <p>No items in cart</p>
        )}
        <hr />
        <h5>Total: ₹{totalAmount.toFixed(2)}</h5>
      </div>

      {/* Payment Method */}
      <div className="card p-3 mt-3">
        <h5>Select Payment Method</h5>
        <select
          className="form-control"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Credit/Debit Card</option>
          <option value="NETBANKING">Net Banking</option>
        </select>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="btn btn-primary mt-3 w-100"
        disabled={cart.length === 0}
      >
        PLACE ORDER
      </button>
    </div>
  );
};

export default PlaceOrder;
