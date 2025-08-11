const Admin = require("../models/adminModel");
const jwt=require("jsonwebtoken");

// id i will convert token 
const generateToken=require("../utils/generateToken");

//admin register 
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id,"admin"),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//login admin

const loginAdmin = async (req,res) => {
    const {email,password}=req.body;
    try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id,"admin"),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }

};

module.exports={
    registerAdmin,loginAdmin,
};