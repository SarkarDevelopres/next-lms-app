import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    try {
        const { id } = req.body;
        let chapterData = await Chapter.findById(id);
        res.status(200).json({ message: "Success", success: true, data:chapterData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
