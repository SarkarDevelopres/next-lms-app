import Course from "@/models/Course";
import User from "@/models/User";
import connectDB from "@/middleware/connectDB";
import { jwtDecode } from "jwt-decode";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        const { userToken } = req.body;
        let decodedId = jwtDecode(userToken);
        if (!decodedId || !decodedId.id) {
            throw new Error("Invalid token");
        }
        let userDetails = await User.findById(decodedId.id);
        let courseList = await Course.find({ "InstituteID": userDetails.InstituteID, Published: true }).select('_id');
        courseList = courseList.map(course => course._id.toString());
        const token = jwt.sign({ courseListData: courseList }, process.env.ACCESS_TOKEN, { expiresIn: "120m" });
        console.log(courseList)
        // console.log(jwtDecode(newSubAdminListToken));
        res.status(200).json({ message: "Success", success: true, courseListToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
