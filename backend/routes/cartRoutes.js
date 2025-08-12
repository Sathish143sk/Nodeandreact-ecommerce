const express = require("express");
const router = express.Router();
const is_user = require("../middleware/authMiddleware");
const {addToCart,getCartByUserId,removeCartItem} = require("../controller/cartController");

router.post("/addToCart", is_user, addToCart);
router.get("/getCartByUserId/:id", is_user, getCartByUserId);
router.delete("/removeCartItem/:userId/:productId", is_user, removeCartItem);

module.exports = router;