const mongoose = require("mongoose");

const login = new mongoose.Schema(
  {    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserLoginModel", login);
