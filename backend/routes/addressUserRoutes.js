// routes/addressRoutes.js
const express =require("express");
const { addAddress, getUserAddresses, updateAddress, deleteAddress } =require("../controller/addressUserController.js");
const is_user =require("../middleware/authMiddleware.js");

const route = express.Router();

route.post("/addAddress", is_user, addAddress);
route.get("/getUserAddresses", is_user, getUserAddresses);
route.put("/updateAddress/:id", is_user, updateAddress);
route.delete("/deleteAddress/:id", is_user, deleteAddress);

module.exports= route;
