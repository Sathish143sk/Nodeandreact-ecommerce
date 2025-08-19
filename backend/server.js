const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require("./routes/productRoutes");
const categoryRoutes= require("./routes/categoryRoutes");
const userRoutes=require("./routes/userRoutes");
const cartRoutes=require("./routes/cartRoutes");
const homeProducts=require("./routes/userProductRoutes");
const homeCategory=require("./routes/userCategoryRoutes");
const userAddress=require("./routes/addressUserRoutes");
const userOrders=require("./routes/orderRoutes");
const adminOrders=require("./routes/adminOrderRoutes");

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
app.use("/api/admin/orders",adminOrders);
app.use("/api/user/cart",cartRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",homeProducts);
app.use("/api/category",homeCategory);
app.use("/api/user/address",userAddress);
app.use("/api/orders",userOrders);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));