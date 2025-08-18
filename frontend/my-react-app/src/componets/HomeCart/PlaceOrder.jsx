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

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const total = storedCart.reduce((acc, item) => {
      const price = Number(item.price) || 0; // fallback to 0 if not a number
      const qty = Number(item.qty) || 0; // fallback to 0 if not a number
      return acc + price * qty;
    }, 0);

    setTotalAmount(total.toFixed(2));
  }, []);

  // ✅ fetch all user addresses
  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/address/getUserAddresses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.length > 0) {
          setAddress(data[0]); // pick the first address (or allow selection later)
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };

    fetchAddress();
  }, [token]);

  // ✅ Handle Place Order -> go to payment page or complete COD
  const handlePlaceOrder = async () => {
    try {
      if (!cart.length) {
        alert("Cart is empty!");
        return;
      }

      if (!address) {
        alert("Please add a shipping address.");
        return;
      }

      if (paymentMethod === "COD") {
        const { data } = await axios.post(
          "http://localhost:5000/api/order/place",
          { cart, address, totalAmount, paymentMethod },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Order placed successfully with COD!");
        navigate("/order-success", { state: { order: data } });
      } else {
        // For online payments
        const { data } = await axios.post(
          "http://localhost:5000/api/payment",
          { amount: totalAmount, paymentMethod },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        navigate("/payment", {
          state: {
            paymentData: data,
            cart,
            address,
            totalAmount,
            paymentMethod,
          },
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
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
                {item.name} x {item.qty}
              </span>
              <span>
                ₹
                {((Number(item.price) || 0) * (Number(item.qty) || 0)).toFixed(
                  2
                )}
              </span>
            </div>
          ))
        ) : (
          <p>No items in cart</p>
        )}
        <hr />
        <h5>Total: ₹{totalAmount}</h5>
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
