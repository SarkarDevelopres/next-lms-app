const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Description:{ type: String},
    URL:{ type:String, required: true },
    Videos:{type:Number}
}, { timestamps: true });

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);