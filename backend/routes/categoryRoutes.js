const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../multer/categoryMulter");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controller/categoryController");

// Routes
router.post("/addCategory", isAdmin, upload.single("image"), createCategory);
router.get("/getAllCategory", isAdmin, getAllCategories);
router.get("/getCategoryById/:id", isAdmin, getCategoryById);
router.put("/updateCategory/:id", isAdmin, upload.single("image"), updateCategory);
router.delete("/deleteCategory/:id", isAdmin, deleteCategory);

module.exports = router;
