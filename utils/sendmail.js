import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sendMail = async (options)=>{
    const Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || 587),
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    Transporter.verify(function(error, success) {
        if (error) {
            console.error("Error verifying transporter:", error);
        } else {
            console.log("Transporter is ready to send emails");
        }
    });
    

    const {email, subject, template, data} = options;
    const templatePath = path.join(__dirname,'../mails',template);
    // console.log(__filename + __dirname);
    const html = await ejs.renderFile(templatePath,data);
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await Transporter.sendMail(mailOptions);
}

export default sendMail