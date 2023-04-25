const express = require("express");
const router=express.Router();

const{
    signUp,
    verifyOTP,

}=require('../controller/UserAuthenticationController');
const { login } = require("../controller/UserLoginController");
const{
    checkEmail,
    verifyEmail,
    checkPassword
}=require('../controller/ForgetPasswordController');

//signUp
router.post('/signup',signUp);

//verifyOTP
router.post('/verifyOTP',verifyOTP);

//checking email is same as database
router.post('/checkEmail',checkEmail);

//verify to change password
router.post('/verifyEmail',verifyEmail);

//checking forget password
router.post('/checkPassword',checkPassword);

router.post("/login/verify", login);
module.exports = router;