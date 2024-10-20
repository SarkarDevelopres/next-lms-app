import SubAdmin from "@/models/SubAdmin";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';
import sendMail from "../../../../utils/sendmail";

const createActivationToken = (subAdmin) => {
    let activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        {
            subAdmin,
            activationCode
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m"
        }
    )

    return { token, activationCode };
}

const handler = async (req, res) => {
    const { Name, Email, Phone, Password, PlanId } = req.body;
    let emailExists = await SubAdmin.findOne({ "Email": Email });
    // console.log(emailExists);
    if (emailExists) {
        res.status(300).json({success:false, message: "SubAdmin Already Exist!!" })
    } else {
        let subAdmin = { Name: Name, Email: Email, Phone: Phone, Password: Password, PlanId: PlanId};
        let activationToken = createActivationToken(subAdmin);
        let activationCode = activationToken.activationCode;

        const data = { subAdmin: `${Name}`, code: activationCode };
        // console.log(data);
        try {
            await sendMail({
                email: subAdmin.Email,
                subject: "Activate your account",
                template: "activation-email-subadmin.ejs",
                data
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${subAdmin.Email} to activate your account`,
                activationToken: activationToken.token
            })
        } catch (error) {
            res.status(400).json({success:false, message: "There is a problem with email" });;
        }
    }
}

export default connectDB(handler);