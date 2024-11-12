const response = require("../helpers/response");
var jwt = require('jsonwebtoken');


const isValidUser = (req,res,next)=>{
    const {authorization} = req.headers;
    try{
        let token = authorization.split(" ")[1];
        if(token){
            const decoded  = jwt.verify(token, process.env.JWT_SECRECT);
            req.User = decoded;
            next();
        }
    }catch(error){
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "isValidUser Failed", errors: error.message }));
    }
}


module.exports  = isValidUser;