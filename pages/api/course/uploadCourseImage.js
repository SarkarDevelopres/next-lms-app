import Course from "@/models/Course";
import connectDB from "@/middleware/connectDB";
import { v2 as cloudinary } from 'cloudinary'
import { upload, uniqueFileName } from "@/utils/multerConfig";
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            // Handle file upload
            await new Promise((resolve, reject) => {
                upload.single("thumbnailImage")(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                        console.log("Uploaded to Server !!");
                    }
                });
            });

            const courseID = req.body.courseID;
            // console.log(courseID);

            // Fetch the course details once
            const course = await Course.findById(courseID).select("InstituteID Image");
            // console.log(course);

            if (!course) {
                return res.status(404).json({ error: "Course not found" });
            }

            const { InstituteID } = course;
            const filePath = process.cwd() + "/public/temp/" + uniqueFileName;
            const uploadFileName = `${InstituteID}_${courseID}`;

            // console.log(course);

            try {
                // Upload to Cloudinary
                let { secure_url, public_id, asset_id } = await cloudinary.uploader.upload(filePath, {
                    resource_type: "image",
                    public_id: uploadFileName,
                });

                console.log("Upload successful:", { secure_url, public_id, asset_id });

                // Remove the uploaded file from local storage
                fs.unlinkSync(filePath);

                // Update the course with the new image data
                course.Image = { secure_url, public_id, asset_id };
                await course.save();

                res.status(200).json({ success: true, message: "Successfully Uploaded Thumbnail Image!" });
            } catch (error) {
                console.error("Error during file upload:", error);
                res.status(500).json({ error: "Failed to upload image to Cloudinary" });
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