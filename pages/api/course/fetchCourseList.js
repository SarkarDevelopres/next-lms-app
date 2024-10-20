import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        const { InstituteIDToken,subAdminListToken } = req.body;
         let decodedId =  jwtDecode(InstituteIDToken);
         let decodedListDetails =  jwtDecode(subAdminListToken);
         if (!decodedId || !decodedId.id) {
            throw new Error("Invalid token");
        }
        let courseList = await Course.find({InstituteID:decodedId.id}).select('_id');
        console.log(courseList)
        let newSubAdminListToken = jwt.sign({ 
            planId:decodedListDetails.PlanId,
            studentIdList: decodedListDetails.studentsIdList,
            courseIdList: courseList }, 
            process.env.ENCRYTED_DATA_TOKEN, { expiresIn: "120m" }
        );
        console.log(jwtDecode(newSubAdminListToken));
        res.status(200).json({ message: "Successfulyl Registered !!", success: true, tokenData:newSubAdminListToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
