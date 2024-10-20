import UserProgress from "@/models/UserProgress";
import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";
import { jwtDecode } from "jwt-decode";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { userToken, courseID } = req.body
            let userID = jwtDecode(userToken).id
            let userProgressData = await UserProgress.findOne({ "UserID": userID, "CourseID": courseID })
            let chapterList = await Chapter.find({ "CourseID": courseID }).select('_id');
            // console.log("User Progress Data is:"+userProgressData);
            if (userProgressData && userProgressData.length > 0) {
                // console.log("userProgressData is there");
                let currentChapterID = userProgressData.CurrentChapterID
                // console.log("Current Chapter ID is:"+currentChapterID);
                const progressData = {
                    completedChapters:userProgressData.CompletedChapters.length,
                    totalChapters:chapterList.length
                }
                    // console.log("First Chapter ID:"+chapterList[0]._id);
                    res.status(200).json({ success: true, message: "success", data:{currentChapterID:currentChapterID,progressData:progressData} })
            }
            else {
                try {
                    console.log("userProgressData is not there");
                    let userProgressData = new UserProgress({
                        UserID: userID,
                        CourseID: courseID,
                        CurrentChapterID: chapterList[0]._id,
                        CompletedChapters: []
                    })
                    await userProgressData.save()

                    const progressData = {completedChapters:0,totalChapters:chapterList.length}
                    // console.log("First Chapter ID:"+chapterList[0]._id);
                    res.status(200).json({ success: true, message: "success", data:{currentChapterID:chapterList[0]._id,progressData:progressData} })
                } catch (error) {
                    res.status(500).json({ success: false, message: error.message })
                }
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}

export default connectDB(handler)