import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { courseID, courseNewData } = req.body;
            await Course.findByIdAndUpdate(courseID, { "$set": { Title: courseNewData.Title, Description:courseNewData.Description } });
            res.status(200).json({ success: true, message:"Updated!" });
        } catch (error) {
            res.status(200).json({ success: false, message:error.message });
        }
    }
}
export default connectDB(handler)