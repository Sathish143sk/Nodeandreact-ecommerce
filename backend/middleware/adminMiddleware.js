const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const is_Admin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Admin Token:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token payload:", decoded);
      // Attach admin to request (without password)
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      next();
    } catch (error) {
      console.error("Admin token verification failed:", error.message);
      return res
        .status(401)
        .json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

module.exports = is_Admin;
