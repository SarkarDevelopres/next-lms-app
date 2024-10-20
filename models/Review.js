const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Text:{ type:String },
    Rating:{ type:Number },
    userID:{ type:String },
    videoID:{ type:String },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);