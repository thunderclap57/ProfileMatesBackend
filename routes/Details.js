const express = require("express");


const router = express.Router();

const { addDetails, getDetails } = require("../controller/DetailsController");


router.post("/addDetails",addDetails);
router.post("/getDetails",getDetails);

module.exports = router;
