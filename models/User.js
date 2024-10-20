import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const emailRegexPattern = /^[^\s@]+@[^\s@]+|.[^\s@]+$/;

const UserSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Image: { type: Object, default: { secure_url: null } },
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
    InstituteID: {
        type: String,
    },
    Verified: { type: Object, default: { email: true, phone: false } }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(`${this.Password}`, salt);
    this.Password = hash;
    next();
});
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};
UserSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "");
};
UserSchema.methods.SignRefreshToken = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "");
};


export default mongoose.models.User || mongoose.model("User", UserSchema);