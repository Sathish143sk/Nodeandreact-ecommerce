const express = require("express");
const route=express.Router();
const {getUserProducts} = require("../controller/userProductController");


route.get("/getUserProducts", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, getUserProducts);


module.exports=route;