const uploader = require("../helpers/fileUploadHelper");
const response = require("../helpers/response");

function fileUpload(req, res, next) {
    const upload = uploader(
        "avatar", // folder name
        ["image/jpeg", "image/jpg", "image/png"], // allowed mime types
        1000000, // max file size
        "Only .png, .jpg, .jpeg formats are allowed"
    );

    // Call middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "file upload error", errors: err.message }));
        } else {
            next();
        }
    });
}

module.exports = fileUpload;
