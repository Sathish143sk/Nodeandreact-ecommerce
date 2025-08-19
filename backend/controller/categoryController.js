const Category = require("../models/categoryModel");

// Create category
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : "default.png";

  try {
    const exist = await Category.findOne({ name });
    if (exist) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, description, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  const search = req.query.search || "";
  const keyword = { name: { $regex: search, $options: "i" } };

  try {
    const categories = await Category.find(keyword);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update category (with image support)
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Build update object
    const updateData = { name, description };
    if (req.file) {
      updateData.image = req.file.filename; // Add image if uploaded
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
