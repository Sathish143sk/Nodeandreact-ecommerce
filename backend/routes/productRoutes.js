const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkImportProduct,
} = require("../controller/productController");

const router = express.Router();

const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../multer/productMulter");


router.post("/bulkImportProduct",isAdmin,upload.single("csvFile"),bulkImportProduct);
router.post("/addProduct", isAdmin, upload.single("image"), createProduct);
router.get("/getAllProduct",isAdmin, getAllProducts);
router.get("/getProductById/:id",isAdmin, getProductById);
router.put("/updateProduct/:id", isAdmin, upload.single("image"), updateProduct);
router.delete("/deleteProduct/:id", isAdmin, deleteProduct);

module.exports = router;
