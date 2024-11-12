const multer = require("multer");
const path = require("path");

function uploader(subfolder_path, allowed_file_types, max_file_size, error_msg) {
    console.log("__dirname,",__dirname)
    //file upload folder
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
    console.log("UPLOADS_FOLDER",UPLOADS_FOLDER)

    //define storage
    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const filename = 
            file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-")+"-"+Date.now();

            cb(null, filename+fileExt);
        },
    });

    //prepare the final mulder upload object
    const upload = multer({
        storage: storage,
        limits:{
            fieldSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true);
            }else{
                throw new Error("File not uploaded")
            }
        }
    })
    return upload;
}

module.exports = uploader;