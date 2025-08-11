const express = require("express");
const route=express.Router();
const {registerAdmin,loginAdmin} =require("../controller/adminController");
const is_admin=require("../middleware/adminMiddleware");


route.post("/register",registerAdmin);
route.post("/login",loginAdmin);

//product route
route.get("/dashboard",is_admin,(req,res) => {
    res.json({message: `Welcome, ${req.admin.name}`});
});

module.exports=route;

