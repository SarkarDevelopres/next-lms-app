import multer from "multer";
import fs from "fs";

let uniqueFileName = ""; // Store the unique file name here

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "./public/temp";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1000);
        uniqueFileName = file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage });

export { upload, uniqueFileName };
