const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    quantity: { 
      type: Number, 
      default: 1, 
      min: [1, "Quantity must be at least 1"] 
    },
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: [0, "Price must be positive"] 
    },
    image: { 
      type: String, 
      default: "" 
    },
    category: { 
      type: String, 
      default: "" 
    }
  },
  { timestamps: true }
);

// Optional: Auto-calculate total price for the item
cartSchema.virtual("totalItemPrice").get(function () {
  return this.price * this.quantity;
});

module.exports = mongoose.model("Cart", cartSchema);
