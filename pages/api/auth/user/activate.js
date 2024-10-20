import User from "@/models/User";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    // console.log(req.body);
    const { token, code } = req.body
    const newUser = jwt.verify(token.toString(), process.env.ACTIVATION_SECRET);
    if (newUser.activationCode === code.userCode && newUser.instituteCode === code.instituteCode  ) {
        const { FirstName, LastName, Email, Phone, Password, InstituteID } = newUser.user;
        // console.log(newUser.user);
        const user = new User({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Phone: Phone,
            Password: Password,
            InstituteID: InstituteID
        });
        await user.save();
        res.status(200).json({ message: "Success", success: true });
    } else {
        res.status(300).json({message:"Wrong Code!!",success:false})
    }

}

export default connectDB(handler);