import UserProgress from "@/models/UserProgress";
import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";
import { jwtDecode } from "jwt-decode";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { userToken, courseID, currentCompletedChapterID } = req.body
            let userID = jwtDecode(userToken).id

            let chapterList = await Chapter.find({ "CourseID": courseID }).select('_id');
            let chapterIds = chapterList.map(chapter => chapter._id.toString());
            // console.log("ChapterID :"+  Array.isArray(chapterIds));
            const currentCompletedChapterIndex = chapterIds.findIndex(chapterId => chapterId === currentCompletedChapterID);


            // Get the next chapter if it exists
            console.log("Index Current :" + currentCompletedChapterIndex);
            const currentChapterID = currentCompletedChapterIndex >= 0 && currentCompletedChapterIndex < chapterList.length - 1
                ? chapterList[currentCompletedChapterIndex + 1]._id
                : null;
            if (currentChapterID == null) {
                console.log("NO next Chapter !!");
                let userProgressData = await UserProgress.findOne({ "UserID": userID, "CourseID": courseID });
                if (chapterList.length == userProgressData.CompletedChapters.length) {
                    res.status(200).json({
                        success: true,
                        message: "Course Already Completed !!",
                        data: {
                            progressData: {
                                completedChapters:userProgressData.CompletedChapters,
                                totalChapters: chapterList.length
                            },
                            currentChapterID: null
                        }
                    })
                } else {
                    let newUserProgressData = await UserProgress.findOneAndUpdate(
                        { "UserID": userID, "CourseID": courseID },
                        {
                            "$push": { CompletedChapters: currentCompletedChapterID }
                        },
                        { new: true } // Returns the updated document
                    );
                    const progressData = {
                        completedChapters: newUserProgressData.CompletedChapters.length,
                        totalChapters: chapterList.length
                    }
                    res.status(200).json({ success: true, message: "Course Completed !!", data: { progressData: progressData, currentChapterID: null } })
                }
            } else {

                console.log("YES next Chapter !!");
                let userProgressData = await UserProgress.findOneAndUpdate(
                    { "UserID": userID, "CourseID": courseID },
                    {
                        "$set": { CurrentChapterID: currentChapterID },
                        "$push": { CompletedChapters: currentCompletedChapterID }
                    },
                    { new: true } // Returns the updated document
                );
                const nextChapterID = currentCompletedChapterIndex >= 0 && currentCompletedChapterIndex < chapterList.length - 2
                    ? chapterList[currentCompletedChapterIndex + 2]._id
                    : null;
                const progressData = {
                    completedChapters: userProgressData.CompletedChapters.length,
                    totalChapters: chapterList.length
                }

                res.status(200).json({ success: true, message: "success", data: { currentChapterID: currentChapterID, progressData: progressData, nextChapterID: nextChapterID } })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}

export default connectDB(handler)