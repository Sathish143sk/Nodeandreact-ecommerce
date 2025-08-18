const express = require("express");
const router = express.Router();
const is_user = require("../middleware/authMiddleware");
const {addToCart,getCartByUserId,removeCartItem,updateCartItem,getSingleCartItem} = require("../controller/cartController");

router.post("/addToCart", is_user, addToCart);
router.get("/getCartByUserId/:id", is_user, getCartByUserId);
router.put("/updateCartItem/:id", is_user, updateCartItem);
router.delete("/removeCartItem/:cartId", is_user, removeCartItem);
router.get("/getSingleCartItem/:id", is_user, getSingleCartItem);

module.exports = router;