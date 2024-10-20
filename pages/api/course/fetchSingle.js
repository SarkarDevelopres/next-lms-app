import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);
        let courseData = await Course.findById(id);
        res.status(200).json({ message: "Success", success: true, data:courseData });
        // res.status(200).json({message:"okay"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
