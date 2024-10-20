import User from "@/models/User";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Use await with the User.findOne
        const user = await User.findOne({ "Email": Email }).select("+Password");

        if (!user) {
            return res.status(400).json({ success: false, message: 'Wrong email' });
        }

        // Ensure comparePassword is correctly implemented in your User schema
        const isPasswordMatch = await user.comparePassword(Password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Wrong password' });
        }

        // Use an object as the first argument to jwt.sign
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "120m" });
        const userID = user._id.toString()
        const uniqueURL = `${user.FirstName}_${user.LastName}_${userID}`
        console.log(uniqueURL);
        // Send the token and user info back to the client
        return res.status(200).json({ success: true, message: `Welcome ${user.FirstName} !!`, token: token, URLID:uniqueURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default connectDB(handler);
