const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controller/adminOrdersController");
const is_admin = require("../middleware/adminMiddleware");

// adminroutes
router.get("/getUSerOrders",is_admin,getAllOrders);

module.exports =router;