const uploader = require("../helpers/fileUploadHelper");

function fileUpload(req, res, next) {
    const upload = uploader(
        "avatar", // folder name
        ["image/jpeg", "image/jpg", "image/png"], // allowed mime types
        1000000, // max file size
        "Only .png, .jpg, .jpeg formats are allowed"
    );

    // Call middleware function
    upload.single("file")(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = fileUpload;
