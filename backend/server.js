const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require("./routes/productRoutes");
const categoryRoutes= require("./routes/categoryRoutes");
const userRoutes=require("./routes/userRoutes");
const cartRoutes=require("./routes/cartRoutes");
const homeProducts=require("./routes/userProductRoutes");
const cors = require("cors");
const path = require("path"); 
dotenv.config();
connectDB(); 

const app=express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin",adminRoutes);
app.use("/api/admin/product",productRoutes);
app.use("/api/admin/category",categoryRoutes);
app.use("/api/user/cart",cartRoutes)
app.use("/api/user",userRoutes);
app.use("/api/product",homeProducts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));