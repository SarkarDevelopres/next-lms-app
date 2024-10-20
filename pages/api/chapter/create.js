import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";


const handler = async(req,res)=>{
    try {
        
        const {courseID, Name} = req.body;
        const existingChapters = await Chapter.find({ "CourseID":courseID }).sort({ chapterNumber: 1 });
        const chapterNumber = existingChapters.length > 0 ? existingChapters[existingChapters.length - 1].chapterNumber + 1 : 1;
        let chapter = new Chapter({
            CourseID:courseID,
            Name:Name,
            ChapterNumber:chapterNumber
        })
        await chapter.save()

        res.status(200).send({success:true, message:"Succesfully Created !", data:{_id:chapter._id,Name:Name}})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({success:false,message:"Failed to Create!"});
    }
}

export default connectDB(handler);