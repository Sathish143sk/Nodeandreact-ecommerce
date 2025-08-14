const express = require("express");
const route=express.Router();
const {getUserCategory} = require("../controller/UserCategoryController");


route.get("/getUserCategorys", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, getUserCategory);


module.exports=route;