import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    try {
        const { id, Published } = req.body;
        let chaptersList = await Chapter.find({"CourseID":id}).select("_id")
        if (chaptersList && chaptersList.length > 0) {
            await Course.findByIdAndUpdate(id, { "$set": { Published: Published } });
            res.status(200).json({ message: "Successfully Published", success: true, error:false });
        }
        else{
            res.status(400).json({ message: "Add Chapters to Publish", success: false, error:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error:true, message: error.message });
    }
}

export default connectDB(handler);
