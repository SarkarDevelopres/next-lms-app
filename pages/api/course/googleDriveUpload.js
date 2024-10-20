import { google } from "googleapis";
import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import multer from "multer";
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import fs from 'fs';
import path from 'path';
import { file } from "googleapis/build/src/apis/file";

export const config = {
  api: {
    bodyParser: false,
  },
};

let uniqueFileName = ""; // Store the unique file name here

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1000);
    uniqueFileName = file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await new Promise((resolve, reject) => {
        upload.single("thumbnailImage")(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Now you have access to the unique file name after the upload is completed.
      // console.log("Unique file name:", uniqueFileName);
      // console.log(filePath);
      // Proceed to upload the file to Google Drive using `uniqueFileName` if needed.


      const decodedId = jwtDecode(req.body.InstituteIDToken);
      console.log("Decoded ID: " + decodedId);
      const mimetype = req.file.mimetype
      const filePath = process.cwd() + "/public/temp/" + req.file.filename
      const parsedCourseData = { ...JSON.parse(req.body.courseData) }
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_DRIVE_CLIENT_ID,
        process.env.GOOGLE_DRIVE_CLIENT_SECRET,
        process.env.GOOGLE_DRIVE_REDIRECT_URI
      );
      oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });

      const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
      });

      // FOR ADDING FOLDER

      // const fileMetadata = {
      //   name: 'LMS',
      //   mimeType: 'application/vnd.google-apps.folder',
      // };
      // const file = await drive.files.create({
      //   requestBody: fileMetadata,
      //   fields: 'id',
      // });
      // console.log('Folder Id:', file.data.id);
      // const folderId = file.data.id;

      const uploadtoDrive = await drive.files.create({
        requestBody: {
          name: `${parsedCourseData.Title}-${decodedId.id}.jpg`,
          parents: [`1R7DNvOkLr7aa3L9LWsaQl-AX1ifZAftW`],
          mimeType: mimetype
        },
        media: {
          mimeType: mimetype,
          body: fs.createReadStream(filePath)
        }
      });


      await drive.permissions.create({
        fileId: uploadtoDrive.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      const publicUrl = await drive.files.get({
        fileId: uploadtoDrive.data.id,
        fields: 'webViewLink, webContentLink'
      });
      const { webViewLink, webContentLink } = publicUrl.data

      // console.log(publicUrl);

      if (publicUrl.statusText == 'OK') {
        fs.unlinkSync(filePath);
        const course = new Course({
          InstituteID: decodedId.id,
          Title: parsedCourseData.Title,
          ImageID: uploadtoDrive.data.id,
          Image: webViewLink,
          Description: parsedCourseData.Description,
          Price: parsedCourseData.Price,
          Chapters: []
        });
        await course.save();
        console.log("Course Registered Successfully !");
        res.status(publicUrl.status).json({
          success: true,
          message: "Course Registered Successfully !",
          uniqueFileName: uniqueFileName
        });
      } else {
        res.status(publicUrl.status).json({
          success: false,
          message: "Couldn't register course",
          file: req.file,
          uniqueFileName: uniqueFileName
        });
      }


    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDB(handler);
