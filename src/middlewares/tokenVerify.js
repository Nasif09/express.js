const tokenVerify = (req,res,next)=>{
    const {authorization} = req.header;
    try{
        let token = authorization.split(' ')[1]
        if(token){
            const decoded  = jwt.verify(token, process.env.JWT_SECRECT);
            req.User = decoded;
            next();
        }
    }catch{
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "tokenVerify Failed", errors: error.message }));
    }
}


module.exports  = tokenVerify;