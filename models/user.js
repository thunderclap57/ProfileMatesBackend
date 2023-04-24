const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({ 
   
    name: {
         type: String, 
         required: true, 
         unique: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true 
        },
    password: { 
                type: String,
                required: true, 
                unique: true 
            },
    verified: { 
        type: Boolean 
    },       
} );

module.exports=mongoose.model('User',userSchema);