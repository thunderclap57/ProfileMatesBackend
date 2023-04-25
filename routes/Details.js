const express = require("express");


const router = express.Router();

const { addDetails, getDetails } = require("../controller/DetailsController");


router.post("/addDetails",addDetails);
//router.post("/updateUser",updateUser);
router.get("/:id",getDetails);
module.exports = router;
