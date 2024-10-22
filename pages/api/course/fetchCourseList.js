import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        const { subAdminToken } = req.body;
         let decodedId =  jwtDecode(subAdminToken);
         if (!decodedId || !decodedId.id) {
            throw new Error("Invalid token");
        }
        let courseList = await Course.find({"InstituteID":decodedId.id}).select('_id');
        // console.log(courseList)
        let newCourseListToken = jwt.sign({ courseIdList: courseList }, 
            process.env.ENCRYTED_DATA_TOKEN, { expiresIn: "120m" }
        );
        res.status(200).json({ message: "Reterived success", success: true, data:courseList, tokenData:newCourseListToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
