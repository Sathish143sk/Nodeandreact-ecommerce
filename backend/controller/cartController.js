
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
const getCartByUserId = async (req, res) => {
  try {
    const { id } = req.params; // get userId from URL
    const cartItems = await Cart.find({ user: id })
      .populate("product", "name price image category");

    if (!cartItems.length) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ items: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const removeCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;  // cart item _id
    // const userId = req.user._id;     // from auth middleware

    const result = await Cart.deleteOne({ _id: cartId});

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item removed" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// get single cart item
const getSingleCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a cart item
const updateCartItem = async (req, res) => {
  const { id } = req.params;          // Cart item ID from URL
  const { quantity } = req.body;      // New quantity from request body

  try {
    // Find the cart item belonging to the logged-in user
    const cartItem = await Cart.findById(id); 

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Update quantity if provided
    if (quantity !== undefined) {
      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
      cartItem.quantity = quantity;
    }

    // Save updated cart item
    const updatedItem = await cartItem.save();

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  removeCartItem,
  updateCartItem,
  getSingleCartItem,
};
