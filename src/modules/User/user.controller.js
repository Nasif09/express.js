const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const response = require("../../helpers/response");
const User = require("./user.model");
const { sendOTP, verifyOTP } = require('../Otp/otp.service');
const { addUser } = require('./user.service');


//signUp
const signUp = async (req, res) => {
    try {
        var { fullName, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        var otpPurpose = 'email-verification';
        await sendOTP(fullName, email, otpPurpose);
        const newUser = {
            fullName: fullName,
            email: email,
            role: role,
            password: hashedPassword
        };
        const signUpToken = jwt.sign(newUser, process.env.JWT_SECRECT, { expiresIn: '1h' });
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', signUpToken: signUpToken }));
    } catch (error) {
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Signup Failed", errors: error.message }));
    }
}

//validate email for Signup
const validateEmailSignUp = async(req,res) => {
    try{
        var otpPurpose = 'email-verification';
        await verifyOTP(req.User.email, otpPurpose, req.body.otp);
        const user = await addUser(req.User);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: "User Registered Successfully", data: user }));
    }catch(error){
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "email-verification Failed", errors: error.message }));
    }
}

//updateProfile
const updateProfile = async(req,res) => {
    try{
        if(req.files && req.files.length>0){
            let newUser = new User({
                image: req.files[0].filename
            })
            const userData = await newUser.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: "Profile pic uploaded", data: userData }));
        }else{
            return res.status(400).json(response({ status: 'Fail', statusCode: '404', type: 'user', message: "file not found", errors: error.message }));
        }
    }catch(error){
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Profile pic uploaded Failed", errors: error.message }));
    }
}


//signIn
const signIn = async(req,res)=>{
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(response({status: "OK", statusCode: '200', message: 'login-credentials-required' }));
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No user found", errors: error.message }));
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword){
            const payload = { 
                id: user._id, 
                fullName: user.fullName, 
                email: user.email, 
                role: user.role, 
                image: user.image 
            }
            const token = jwt.sign(payload, process.env.JWT_SECRECT, { expiresIn: '1y' });
            return res.status(200).json(response({ status: "OK",  statusCode: '200', type: "user", message: 'SignIn-success',  data: user, accessToken: token }));
        }else{
            return res.status(401).json(response({ status: "Invalid",  statusCode: '401', type: "user", message: 'Invalid credentials', errors: error.message }));
        }
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "SignIn Failed", errors: error.message }));
    }
}


//allUsers
const allUsers = async(req,res)=>{
    try{
        const user = await User.find();
        if(!user){
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found"}));
        }
        return res.status(200).json(response({ status: "OK",  statusCode: '200', type: "user", message: 'successfully fetch users',  data: user}));
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to fetch ", errors: error.message }));
    }
}



//allUsers
const getUsersById = async(req,res)=>{
    try{
        const { id } = req.User;
        const user = await User.findById(id );
        if(!user){
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found"}));
        }
        return res.status(200).json(response({ status: "OK",  statusCode: '200', type: "user", message: 'successfully fetch users',  data: user}));
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to fetch ", errors: error.message }));
    }
}


//deleteAccount
const deleteAccount = async(req,res)=>{
    try{
        const { id } = req.User;
        console.log("USer1:",req.User);
        const user = await User.findByIdAndDelete(id );
        console.log("USer2:",user);
        if(!user){
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found"}));
        }
        return res.status(200).json(response({ status: "OK",  statusCode: '200', type: "user", message: 'users deleted',  data: user}));
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to delete ", errors: error.message }));
    }
}

module.exports = {
    signUp,
    signIn,
    validateEmailSignUp,
    updateProfile,
    allUsers,
    getUsersById,
    deleteAccount
}