import SubAdmin from "@/models/SubAdmin";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    // console.log(req.body);
    const { token, code } = req.body
    const newSubAdmin = jwt.verify(token.toString(), process.env.ACTIVATION_SECRET);
    if (newSubAdmin.activationCode === code) {
        const { Name: Name, Email, Phone, Password, PlanId } = newSubAdmin.subAdmin;
        // console.log(newSubAdmin.user);
        const subAdmin = new SubAdmin({
            Name: Name,
            Email: Email,
            Phone: Phone,
            Password: Password,
            PlanId: PlanId
        });
        await subAdmin.save();
        res.status(200).json({ message: "Success", success: true });
    } else {
        res.status(300).json({message:"Wrong Code!!",success:false})
    }

}

export default connectDB(handler);