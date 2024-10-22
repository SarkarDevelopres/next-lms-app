import SubAdmin from "@/models/SubAdmin";
import User from "@/models/User";
import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Use await with the SubAdmin.findOne
        const subAdmin = await SubAdmin.findOne({ "Email": Email }).select("+Password");

        if (!subAdmin) {
            return res.status(400).json({ success: false, message: 'Wrong email' });
        }

        // Ensure comparePassword is correctly implemented in your SubAdmin schema
        const isPasswordMatch = await subAdmin.comparePassword(Password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Wrong password' });
        }

        let studentsIdList = await User.find({ SubAdminId: subAdmin._id }).select("_id");
        let courseList = await Course.find({ InstituteID: subAdmin._id }).select('_id');


        // Use an object as the first argument to jwt.sign
        const subAminIDToken = jwt.sign({
            id: subAdmin._id,
        }, process.env.ACCESS_TOKEN, { expiresIn: "120m" });
        const subAdminPlanIDToken = jwt.sign({
            planId: subAdmin.PlanId,
        }, process.env.ACCESS_TOKEN, { expiresIn: "120m" })
        const subAdminStudentListToken = jwt.sign({
            studentList: studentsIdList,
        }, process.env.ACCESS_TOKEN, { expiresIn: "120m" })
        const subAdminCourseListToken = jwt.sign({
            courseList: courseList,
        }, process.env.ACCESS_TOKEN, { expiresIn: "120m" })

        // Send the token and user info back to the client
        return res.status(200).json({
            success: true, message: `Welcome ${subAdmin.Name} !!`, token: {
                subAminIDToken, subAdminPlanIDToken, subAdminStudentListToken, subAdminCourseListToken
            }, data: { id: subAdmin._id }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
