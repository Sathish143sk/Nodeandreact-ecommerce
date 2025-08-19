const Order = require("../models/Order");

// Confirm Payment (after Razorpay/Stripe success)
const confirmPayment = async (req, res) => {
  try {
    const { orderId, paymentId, status } = req.body;

    // Validate
    if (!orderId || !paymentId) {
      return res.status(400).json({ message: "orderId and paymentId are required" });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update payment details
    order.paymentResult = {
      paymentId,
      status,
      update_time: new Date(),
    };

    order.paymentStatus = status === "success" ? "Paid" : "Failed";

    await order.save();

    res.json({
      success: true,
      message: "Payment updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { confirmPayment };
