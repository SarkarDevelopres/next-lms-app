import SubAdmin from "@/models/SubAdmin";
import User from "@/models/User";
import Video from "@/models/Video";
import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";

const handler = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwtDecode(token);

        if (!decoded || !decoded.id) {
            throw new Error("Invalid token");
        }

        const id = decoded.id;
        let subAdmin = await SubAdmin.findById(id);

        if (subAdmin) {
            res.status(200).json({ 
                success: true, 
                data: subAdmin
                }
            );
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
