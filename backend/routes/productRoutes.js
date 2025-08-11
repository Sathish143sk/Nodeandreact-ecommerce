const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../multer/productMulter");

router.post("/addProduct", isAdmin, upload.single("image"), createProduct);
router.get("/getAllProduct", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id", isAdmin, upload.single("image"), updateProduct);
router.delete("/deleteProduct/:id", isAdmin, deleteProduct);

module.exports = router;
