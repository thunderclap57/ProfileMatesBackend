const userLogin = require("../models/UserLoginModel");
const details = require("../models/DetailsModel");
const bcrypt = require("bcrypt");


const login = (req, res) => {
  const { userId, email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({
      status: "failed!",
      message: "Enter all the details",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(500).json({
      status: "failed",
      message: "Invalid name entered",
    });
  } else if (password.length < 8) {
    res.status(500).json({
      status: "failed",
      message: "password too short",
    });
  } else {
    const userDetails = userLogin.findOne({ email });
    const details = details.findOne({ userId:userId });
    const isMatch = bcrypt.compare(password, userDetails.password);
    if (isMatch) {
      res.status(200).send({
        status: true,
        message: "Verification sucessful",
        details
      });
    } else
      res.status(401).send({
        status: false,
        message: "Verification failed ",
        
      });
  }
};
module.exports = {
  login,
};
