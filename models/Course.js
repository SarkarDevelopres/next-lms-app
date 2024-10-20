const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    InstituteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    Title:{ type: String, required: true },
    Description:{type:String, required:true},
    Image:{type:Object, required:true},
    Price:{type:Number, required:true},
    Published:{type:Boolean, default:false}
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);