import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";
import { v2 as cloudinary } from 'cloudinary'
import multer from "multer";
import { jwtDecode } from 'jwt-decode';
import fs from 'fs';
import { resolveCaa } from "dns";

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
                upload.single("videoFile")(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("File Uploaded on Server!!");
                        resolve()

                    }
                });
            });

            // Now you have access to the unique file name after the upload is completed.
            // console.log("Unique file name:", uniqueFileName);
            // console.log(filePath);
            // Proceed to upload the file to Google Drive using `uniqueFileName` if needed.


            const mimetype = req.file.mimetype
            const filePath = process.cwd() + "/public/temp/" + req.file.filename
            const parsedChapterData = { ...JSON.parse(req.body.chapterData) }
            const uploadFileName = `${parsedChapterData.Name}-${parsedChapterData._id}`

            try {
                let responseForLarge = await new Promise ((resolve, reject)=>{
                    cloudinary.uploader.upload_large(filePath, {
                        resource_type: "video",
                        public_id: uploadFileName,
                    },(error,result)=>{
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                })
                let { secure_url, public_id, asset_id } = responseForLarge
                // console.log(responseForLarge);
                console.log("Upload successful:", { secure_url, public_id, asset_id });

                fs.unlinkSync(filePath);
                await Chapter.findOneAndUpdate({"_id":parsedChapterData._id},{
                    Name:parsedChapterData.Name,
                    Description:parsedChapterData.Description,
                    VideoURL:secure_url,
                    VideoID:public_id,
                    VideoAssetID:asset_id
                })

                res.status(200).json({ success: true, message: "Succesfully Updated Chapter !!" });
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
