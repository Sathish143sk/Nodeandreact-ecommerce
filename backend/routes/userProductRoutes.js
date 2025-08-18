const express = require("express");
const route=express.Router();
const {getUserProducts,getUserProductById} = require("../controller/userProductController");


route.get("/getUserProducts", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, getUserProducts);
route.get("/getUserProducts/:id", getUserProductById);  

module.exports=route;