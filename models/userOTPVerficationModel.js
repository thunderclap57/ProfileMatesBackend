const mongoose = require("mongoose");

const userOTPVerificationSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name:{
         type: String,
         required: true 
        },
    otp: { 
        type: String,
        required: true,
        unique: true 
    },
    email:  { 
        type: String, 
        required:true,
        unique: true 
    },
    createdAt: { 
        type: Date 
    },   
    expiresAt:{ 
        type: Date 
    },    
} ); 

const userOTPVerification=mongoose.model("userOTPVerification",userOTPVerificationSchema);

module.exports=userOTPVerification;