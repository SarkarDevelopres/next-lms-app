import SubAdmin from "@/models/SubAdmin";
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

        // Use an object as the first argument to jwt.sign
        const token = jwt.sign({ id: subAdmin._id }, process.env.ACCESS_TOKEN, { expiresIn: "120m" });

        // Send the token and user info back to the client
        return res.status(200).json({ success: true, message: `Welcome ${subAdmin.Name} !!`, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
