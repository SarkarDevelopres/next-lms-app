import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const emailRegexPattern = /^[^\s@]+@[^\s@]+|.[^\s@]+$/;

const SubAdminSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        }
    },
    Phone: {
        type: Number,
        required: [true, "Enter phone number"],
        validate: {
            validator: (value) => {
                if (value.toString().length == 10) {
                    return true;
                }
            },
            message: "Please enter a 10 digit phone number"
        }
    },
    Password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password should have atleast 6 characters"],
        select: false
    },
    Address:{
        type:Object,
        required:true,
        default:{
            BuildingNo:'',
            LaneAddress:'',
            City:'',
            State:'',
            Country:'',
            Pincode:''
        }
    },
    InstituteCode:{
        type:Number,
        default: Math.floor(10000 + Math.random() * 90000)
    },
    PlanId: {
        type: String,
        required: true,
    },
    SubscriptionDate: {
        type: Date
    },
    Verified: { type: Object, default: { email: true, phone: false } }
}, { timestamps: true });

SubAdminSchema.pre('save', async function (next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(`${this.Password}`, salt);
    this.Password = hash;
    next();
});
SubAdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

export default mongoose.models.SubAdmin || mongoose.model("SubAdmin", SubAdminSchema);