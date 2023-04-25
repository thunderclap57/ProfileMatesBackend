const express = require("express");
const router=express.Router();

const{
    login,
    signUp,
    verifyOTP,
}=require('../controller/UserAuthenticationController');

const{
    checkEmail,
    verifyEmail,
    checkPassword
}=require('../controller/ForgetPasswordController');

//login
router.post('/login',login);

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

module.exports = router;