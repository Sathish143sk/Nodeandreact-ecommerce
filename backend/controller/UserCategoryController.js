const Category = require("../models/categoryModel"); // import the Category model

const getUserCategory = async (req, res) => {
  try {
    const { category: categoryName } = req.query; // get ?category=Mobile

    let categories = await Category.find({ isVisible: { $ne: false } }).lean();

    if (categoryName) {
      categories = categories.filter((c) => c.name === categoryName);
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserCategory,
};
