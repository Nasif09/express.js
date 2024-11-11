const express = require('express');

const { signUp, signIn, validateEmailSignUp } = require('./user.controller');
const tokenVerify = require('../../middlewares/tokenVerify');
const fileUpload = require('../../middlewares/fileUpload');

const router = express.Router();


//Sign-up user
router.post('/sign-up', signUp);
router.post('/verify-email', tokenVerify, validateEmailSignUp);
router.post('/sign-in', signIn);
// router.post('/forget-password', forgetPassword);
// router.post('/verify-otp', verifyForgetPasswordOTP);
// router.post('/reset-password', resetPassword);
// router.get('/user-details', isValidUser, userDetails);
// router.get('/', isValidUser, allUsers);
// router.patch('/change-password', isValidUser, changePassword);
// router.put('/:id', isValidUser, updateUserByAdmin);
// router.put('/', uploadUsers.fields([
//   { name: 'identityImage', maxCount: 1 },
//   { name: 'profileImage', maxCount: 1 },
//   { name: 'certificateImage', maxCount: 1 }
// ]), convertHeicToPng(UPLOADS_FOLDER_USERS), isValidUser, updateProfile);
router.post('/', fileUpload, (req, res) => {
    res.status(200).json({
        message: "File uploaded successfully!",
        file: req.file, // contains file information
    });
});
// router.delete('/', isValidUser, deleteAccount);


module.exports = router;