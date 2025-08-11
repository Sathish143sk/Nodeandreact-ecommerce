const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// convert password into hash password 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
});

// compare the enderd password with hash password
userSchema.methods.matchPassword= async function(enterpassword){
    return await bcrypt.compare(enterpassword, this.password);
}

const User=mongoose.model("User",userSchema);

module.exports=User;