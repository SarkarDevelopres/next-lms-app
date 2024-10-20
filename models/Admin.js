const mongoose = require('mongoose');

const emailRegexPattern = /^[^\s@]+@[^\s@]+|.[^\s@]+$/;

const AdminSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: {
        type: String,
        required: true,
        unique:true,
        validate:{
            validator:(value)=>{
                return emailRegexPattern.test(value);
            },
            message:"Please enter a valid email"
        }
    },
    Phone: {
        type: Number,
        required: [true,"Enter phone number"],
        validate:{
            validator:(value)=>{
                if(value.toString().length() == 10){
                    return true;
                }
            },
            message:"Please enter a 10 digit phone number"
        }
    },
    Password: {
        type: String,
        required: [true,"Please enter a password"],
        minlength: [6, "Password should have atleast 6 characters"],
        select:false
    },
    Verified:{type:Object, default:{email:false,phone:false}}
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);