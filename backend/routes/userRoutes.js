const express = require("express");
const route=express.Router();
const {userLogin,userRegister,userLists} =require("../controller/userController");
const is_user=require("../middleware/authMiddleware");

route.post("/userRegister",userRegister);
route.post("/userLogin",userLogin);
route.get("/getAllUsers",is_user,userLists);

route.get("/userDashboard",is_user,(req,res) => {
    res.json({message: `Welcome, ${req.user.name}`});
});

module.exports=route;