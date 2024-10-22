import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB"
import deleteAsset from "@/utils/deleteCloudinary"

const handler = async (req, res) => {
    try {
        const { id } = req.body
        let courseDetails = await Course.findById(id);
        let deleteData = await deleteAsset({publicID:courseDetails.Image.public_id,type:"image"})
        if (deleteData.result === "ok") {
            await Course.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Course Deleted Successfully !" })
        }
    } catch (error) {
        res.status(200).json({ success: false, message: "Course Could Not Be Deleted !" })
    }
}

export default connectDB(handler)