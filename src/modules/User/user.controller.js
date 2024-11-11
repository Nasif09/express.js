const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const response = require("../../helpers/response");
const User = require("./user.model");

//signUp
const signUp = async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: "Signup success" }));
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Signup Failed", errors: error.message }));
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
                _id: user._id, 
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

module.exports = {
    signUp,
    signIn
}