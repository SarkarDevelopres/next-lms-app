import { google } from "googleapis";
import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import multer from "multer";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const nc = require("next-connect");

export const config = {
    api: {
        bodyParser: false,
    },
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../public/temp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1000)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({ storage:storage })
  const handler = nc().use(upload.single('thumbnailImage')).post(async (req, res) => {
      console.log(req.body); // undefined
      console.log(req.file); // undefined
      res.status(200).send("yo");
    })
    // const handler = async (req, res) => {
    
// const form = new formidable.IncomingForm({ keepExtensions: true });
// form.uploadDir = path.join(process.cwd(), '/tmp'); // Set a directory for temporary uploads

// form.parse(req, async (err, fields, files) => {
//     try {
//         if (err) throw new Error("File parsing error");

//         const { courseData, InstituteIDToken } = fields;
//         const parsedCourseData = JSON.parse(courseData);
//         const decodedId = jwt.decode(InstituteIDToken);
//         if (!decodedId || !decodedId.id) {
//             throw new Error("Invalid token");
//         }

//         const oauth2Client = new google.auth.OAuth2(
//             process.env.GOOGLE_DRIVE_CLIENT_ID,
//             process.env.GOOGLE_DRIVE_CLIENT_SECRET,
//             process.env.GOOGLE_DRIVE_REDIRECT_URI
//         );
//         oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });

//         const drive = google.drive({
//             version: 'v3',
//             auth: oauth2Client
//         });

//         const thumbnailFile = files.thumbnailImage;

//         const upload = await drive.files.create({
//             requestBody: {
//                 name: `${decodedId.id},${parsedCourseData.Title}.jpg`,
//                 mimeType: thumbnailFile.mimetype
//             },
//             media: {
//                 mimeType: thumbnailFile.mimetype,
//                 body: fs.createReadStream(thumbnailFile.filepath)
//             }
//         });

//         await drive.permissions.create({
//             fileId: upload.data.id,
//             requestBody: {
//                 role: 'reader',
//                 type: 'anyone'
//             }
//         });

//         const publicUrl = await drive.files.get({
//             fileId: upload.data.id,
//             fields: 'webViewLink, webContentLink'
//         });

//         const course = new Course({
//             InstituteID: decodedId.id,
//             Title: parsedCourseData.Title,
//             Image: publicUrl.data.webViewLink,
//             Description: parsedCourseData.Description,
//             Price: parsedCourseData.Price,
//             Chapters: []
//         });
//         await course.save();
//         res.status(200).json({ message: "Successfully Registered !!", success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });
// const upload = multer();
//     const {courseData, thumbnailImage, InstituteIDToken} = req.formData();
//     console.log(courseData);
//     res.status(200).json({ message: "Successfully Registered !!", success: true });
// };

export default handler
