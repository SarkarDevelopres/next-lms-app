const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    CourseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    Name: { type: String, required: true },
    Description:{type:String},
    VideoURL:{ type:String },
    VideoID:{type:String},
    VideoAssetID:{type:String}
}, { timestamps: true });

export default mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);