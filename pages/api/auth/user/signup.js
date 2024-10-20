import User from "@/models/User";
import SubAdmin from "@/models/SubAdmin";
import connectDB from "@/middleware/connectDB";
import jwt from 'jsonwebtoken';
import sendMail from "../../../../utils/sendmail";

const createActivationToken = (user) => {
    let activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    let instituteCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        {
            user,
            activationCode,
            instituteCode
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "10m"
        }
    )

    return { token, activationCode, instituteCode };
}

const handler = async (req, res) => {
    const { FirstName, LastName, Email, Phone, Password, InstituteCode } = req.body;
    let emailExists = await User.findOne({ "Email": Email });
    console.log(emailExists);
    if (emailExists) {
        res.status(300).json({ success: false, message: "User Already Exist!!" })
    } else {
        let institute = await SubAdmin.findOne({ "InstituteCode": InstituteCode })
        if (institute) {
            let user = { FirstName: FirstName, LastName: LastName, Email: Email, Phone: Phone, Password: Password, InstituteID: institute._id };
            let activationToken = createActivationToken(user);
            let activationCode = activationToken.activationCode;
            let instituteCode = activationToken.instituteCode;
            
            const data = { user: `${FirstName + " " + LastName}`, code: activationCode };
            const instituteData = { user: `${FirstName + " " + LastName}`, code: instituteCode }
            try {
                await sendMail({
                    email: user.Email,
                    subject: "Activate your account",
                    template: "activation-email.ejs",
                    data
                });
                await sendMail({
                    email: institute.Email,
                    subject: "User Signing Up Under Your Instittute",
                    template: "institute-authentication-email.ejs",
                    data:instituteData
                });

                res.status(201).json({
                    success: true,
                    message: {
                        user: `Please check your email: ${user.Email} to activate your account`,
                        institute:`Please ask ${institute.Name} to provide the activation code on their email`
                    },
                    activationToken: activationToken.token
                })
            } catch (error) {
                res.status(400).json({ success: false, message: "There is a problem with email" });;
            }
        } else {
            res.status(400).json({ success: false, message: "Check the Instittue Code !!" });;
        }
        // console.log(data);

    }
}

export default connectDB(handler);