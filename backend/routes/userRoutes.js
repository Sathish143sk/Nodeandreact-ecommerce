const express = require("express");
const route=express.Router();
const {userLogin,userRegister,userLists,userByid,updateUser} =require("../controller/userController");
const is_user=require("../middleware/authMiddleware");

route.post("/userRegister",userRegister);
route.post("/userLogin",userLogin);
route.get("/getAllUsers",is_user,userLists);
route.get("/getUserById/:id",is_user,userByid);
route.put("/updateUser/:id", is_user, updateUser);
route.get("/userDashboard",is_user,(req,res) => {
    res.json({message: `Welcome, ${req.user.name}`});
});

module.exports=route;