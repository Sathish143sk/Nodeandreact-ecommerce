
const Cart=require("../models/cartModel");
const Product=require("../models/productModel");
const mongoose = require("mongoose");
// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // from auth middleware

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already in cart
    let existingCartItem = await Cart.findOne({ user: userId, product: productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cart: existingCartItem });
    }

    // Add new cart item
    const cartItem = new Cart({
      user: userId,
      product: productId,
      quantity: quantity || 1,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });

    await cartItem.save();
    res.status(201).json({ message: "Added to cart", cart: cartItem });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
// get cart fior id
const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const cartItems = await Cart.find({ user: userId });

    if (!cartItems.length) {
      return res.status(200).json({ items: [] }); // empty cart
    }

    res.status(200).json({ items: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const result = await Cart.deleteOne({ user: userObjectId, product: productObjectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  addToCart,
  getCartByUserId,
  removeCartItem,
};