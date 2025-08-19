
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { models } = require("mongoose");

// ✅ Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price")
      .populate("shippingAddress");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// ✅ Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("orderItems.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;

    // If delivered → reduce stock
    if (status === "Delivered") {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product._id);
        if (product) {
          product.countInStock -= item.quantity;
          await product.save();
        }
      }
      order.paymentStatus = "Paid"; // ensure paid if delivered
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error while updating order" });
  }
};

module.exports={
  getAllOrders,
  updateOrderStatus,
}