const Product = require("../models/productModel");

// get user view product
const getUserProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let products = await Product.find({ isVisible: { $ne: false } })
      .populate("category", "name")
      .lean();

    if (category) {
      products = products.filter((p) => p.category?.name === category);
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// get single product by id for user
const getUserProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, isVisible: { $ne: false } })
      .populate("category", "name")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports ={
    getUserProducts,
    getUserProductById,
}