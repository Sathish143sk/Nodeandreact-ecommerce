const Product = require("../models/productModel");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Category = require("../models/categoryModel");

// Create Product (with image upload)
const createProduct = async (req, res) => {
  const { name, description, price, category, countInStock } = req.body;
  const image = req.file ? req.file.filename : "default.png";

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    console.error("getAllProducts error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("getProductById error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Product (with optional image upload)
const updateProduct = async (req, res) => {
  const { name, description, price, category, countInStock } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    if (image) product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
  
const bulkImportProduct= async (req,res) => {
  try {
    if (!req.file) {
     return res.status(400).json({ message: "CSV file is required" });
  }
  const filePath = path.resolve(req.file.path);

  if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Uploaded file not found" });
  }

  const category = await Category.find({}, { name: 1 });
  const categoryMap= {};
  category.forEach(cat => {
    categoryMap[cat.name.trim().toLowerCase()] = cat._id.toString();
  });

  const productsToInsert = [];
  const invalidRows = [];

  await new Promise((resolve,reject) => {
    fs.createReadStream(filePath)
    .pipe(csv())
    .on("data",(row) => {
      const normalizeRow ={};
      Object.keys(row).forEach(key => {
        const cleanKey = key.trim().toLowerCase().replace(/"/g, "");
        normalizeRow[cleanKey] =row[key]?.trim();
      });
      let categoryId = normalizeRow["category"];
          if (!categoryId || !categoryId.match(/^[a-fA-F0-9]{24}$/)) {
            const mappedId = categoryMap[categoryId?.toLowerCase() || ""];
            categoryId = mappedId || null;
          }
          if (categoryId) {
            productsToInsert.push({
              name:normalizeRow["name"] || "",
              description:normalizeRow["description"] || "",
              price:parseFloat(normalizeRow["price"]) || 0,
              category:categoryId,
              countInStock:parseInt(normalizeRow["countinstock"]) || 0,
              image:normalizeRow["image"] || "default.png",
            });
          }else {
            invalidRows.push(normalizeRow);
            console.warn(` Invalid category for product: ${normalizeRow["name"]}`);
          }
    })
    .on("end",resolve)
    .on("error",reject)
  });
  if (productsToInsert.length === 0) {
      return res.status(400).json({
        message: "No valid products to insert. Check your CSV data.",
        invalidRows,
      });
    }
    const insertedProducts = await Product.insertMany(productsToInsert);

    fs.unlink(filePath, (err) => {
      if (err) console.warn("Could not delete file:", err);
    });
    
    res.status(201).json({
      message: `Successfully imported ${insertedProducts.length} products.`,
      insertedProducts,
      invalidRows,
    });
  } catch (error) {
    console.error("Bulk import error:", error);
    res.status(500).json({ message: "Server error during bulk import." });
  }
}



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkImportProduct,
};
