const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userID: { type: String },
    courseID:{ type:String }
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);