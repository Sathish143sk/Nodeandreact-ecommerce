const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const generateToken=require("../utils/generateToken");

const userRegister= async (req,res) => {
    const {name,email,password}=req.body;

    try {
        const userExist= await User.findOne({email});
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user=await User.create({ name, email, password });
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id,"user"),
    });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const userLogin=async (req,res) => {
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if (user && (await user.matchPassword(password))) {
            res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id,"user"),
        });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const userLists=async(req,res) => {
    try {
        const user= await User.find().select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
}
const userByid=async (req,res) => {
    try {
       const user = await User.findById(req.params.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
    }
}
const updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports={
    userRegister,
    userLogin,
    userLists,
    userByid,
    updateUser,
};