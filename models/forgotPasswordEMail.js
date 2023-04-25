const mongoose = require("mongoose");

const emailCheckSchema = new mongoose.Schema({
    userID: {
        type:String,
        required:true,
        unique: true    
        
    },
    email:  { 
        type: String, 
        required:true
    }

}); 

module.exports=mongoose.model("emailCheck",emailCheckSchema);
