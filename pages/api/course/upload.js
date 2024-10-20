import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import { v2 as cloudinary } from 'cloudinary'
import multer from "multer";
import { jwtDecode } from 'jwt-decode';
import fs from 'fs';

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
      const uploadFileName = `${parsedCourseData.Title}-${decodedId.id}`

      try {
        let { secure_url, public_id, asset_id } = await cloudinary.uploader.upload(filePath, {
          resource_type: "image",
          public_id: uploadFileName,
        });
        console.log("Upload successful:", { secure_url, public_id, asset_id });

        fs.unlinkSync(filePath);
        const course = new Course({
          InstituteID: decodedId.id,
          Title: parsedCourseData.Title,
          Image: {secure_url, public_id, asset_id},
          Description: parsedCourseData.Description,
          Price: parsedCourseData.Price,
          Chapters: []
        });
        await course.save();
        
        res.status(200).json({ success: true, message: "Succesfully Registered Course !!" });
      } catch (error) {
        console.error("Error during file upload:", error);
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
