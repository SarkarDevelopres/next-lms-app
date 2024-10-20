import mongoose from "mongoose"

const UserProgress = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    CourseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    CurrentChapterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    CompletedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
}, { timestamps: true });

export default mongoose.models.UserProgress || mongoose.model("UserProgress", UserProgress);