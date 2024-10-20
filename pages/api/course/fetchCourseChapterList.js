import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";

const handler = async(req,res)=>{
    try {
        const {courseID} = req.body;
        let chapterList = await Chapter.find({"CourseID":courseID}).select('_id Name');
        res.status(200).send({success:true, message:'Chapter List Successfully Fetched!', data: chapterList})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({success:false, message:'Chapter List Cannot Be Fetched!'})
    }
}

export default connectDB(handler)