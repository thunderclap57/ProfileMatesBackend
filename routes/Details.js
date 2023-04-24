const express = require("express");


const router = express.Router();

const { addDetails, updateUser } = require("../controller/DetailsController");


router.post("/addDetails",addDetails);
//router.post("/updateUser",updateUser);
module.exports = router;
