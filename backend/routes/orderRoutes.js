const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/orderController");
const is_user =require("../middleware/authMiddleware");


// ✅ User routes
router.post("/place", is_user, createOrder);            // Place new order
router.get("/myorders", is_user, getUserOrders);  // Get logged-in user's orders
router.get("/getOrderById/:id", is_user, getOrderById);        // Get single order details



module.exports = router;
