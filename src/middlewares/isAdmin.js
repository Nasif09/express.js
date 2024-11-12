const response = require("../helpers/response");
var jwt = require('jsonwebtoken');


const isAdmin = (req,res,next)=>{
    const {authorization} = req.headers;
    try{
        let token = authorization.split(" ")[1];
        if(token){
            const decoded  = jwt.verify(token, process.env.JWT_SECRECT);
            req.User = decoded;
            if(req.User.role === "admin"){
                next();
            }else{
                return res.json(response({ type: 'user', message: "user is not admin"}));
            }
        }
    }catch(error){
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "isAdmin Failed", errors: error.message }));
    }
}


module.exports  = isAdmin;