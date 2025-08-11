const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
    },
    image: {
    type: String,
    default: "default.png"
  }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
