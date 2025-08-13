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

module.exports ={
    getUserProducts,
}