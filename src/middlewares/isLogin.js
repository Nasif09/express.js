var jwt = require('jsonwebtoken');
const response = require('../helpers/response');


const isLogin = (req,res,next)=>{
    const {authorization} = req.headers;
    try{
        let token = authorization.split(" ")[1];
        if(token){
            const decoded  = jwt.verify(token, process.env.JWT_SECRECT);
            if(!decoded){
                return res.json(response({ type: 'user', message: "login First, Id is not found from token", errors: error.message }));
            }else{
                req.User = decoded;
                next();
            }
        }
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "login First, Id is not found from token", errors: error.message }));
    }
}


module.exports  = isLogin;