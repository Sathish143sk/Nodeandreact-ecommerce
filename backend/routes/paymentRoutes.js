const express = require("express");
const  confirmPayment  = require("../controller/paymentController");
const  is_user  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/confirm", is_user, confirmPayment);

module.exports = router;
