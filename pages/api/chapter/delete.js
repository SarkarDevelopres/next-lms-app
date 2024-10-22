import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB"
import deleteAsset from "@/utils/deleteCloudinary"
const handler = async (req, res) => {
    try {
        const { id } = req.body
        let chapterdetails = await Chapter.findById(id);
        let videoID = chapterdetails.VideoID;
        if (videoID) {
            let deleteData = await deleteAsset({publicID:videoID, type:"video"})
            if (deleteData.result === "ok") {
                await Chapter.findByIdAndDelete(id);
                res.status(200).json({ success: true, message: "Chapter Deleted !" })
            }
        }
        await Chapter.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Chapter Deleted !" })

    } catch (error) {
        res.status(200).json({ success: false, message: "Chapter Could Not Be Deleted !" })
    }
}

export default connectDB(handler)