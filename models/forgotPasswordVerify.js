const mongoose = require("mongoose");

const forgotPasswordVerifySchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true, 
        unique: true 
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
    verified: { 
        type: Boolean 
    },       
} ); 

module.exports=mongoose.model("forgotPasswordVerify",forgotPasswordVerifySchema);

