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
            let chapterList = await Chapter.find({ CourseID: courseID }).select('_id');

            console.log("courseID :"+courseID);
            console.log("chapterList :"+chapterList);

            if (userProgressData) {
                // console.log("userProgressData is there");
                let currentChapterID = userProgressData.CurrentChapterID
                const currentChapterIndex = chapterList.findIndex(chapter => chapter._id.toString() === currentChapterID);

                // Get the next chapter if it exists
                const nextChapterID = currentChapterIndex >= 0 && currentChapterIndex < chapterList.length - 1
                    ? chapterList[currentChapterIndex + 1]._id
                    : null;
                const progressData = {
                    completedChapters: userProgressData.CompletedChapters.length,
                    totalChapters: chapterList.length
                }
                // console.log("First Chapter ID:"+chapterList[0]._id);
                res.status(200).json({ success: true, message: "success", data: { currentChapterID: currentChapterID, progressData: progressData, nextChapterID: nextChapterID } })
            }
            else {
                try {
                    // console.log("userProgressData is not there");
                    // console.log("ChapterList :"+chapterList);
                    let userProgressData = new UserProgress({
                        UserID: userID,
                        CourseID: courseID,
                        CurrentChapterID: chapterList[0]._id,
                        CompletedChapters: []
                    })
                    await userProgressData.save()
                    const progressData = { completedChapters: 0, totalChapters: chapterList.length }
                    // console.log("First Chapter ID:"+chapterList[0]._id);
                    res.status(200).json({ success: true, message: "success", data: { currentChapterID: chapterList[0]._id, progressData: progressData } })
                } catch (error) {
                    res.status(502).json({ success: false, message: error.message })
                    console.log(error.message);
                }
            }
        } catch (error) {
            res.status(501).json({ success: false, message: error.message })
        }
    }
}

export default connectDB(handler)