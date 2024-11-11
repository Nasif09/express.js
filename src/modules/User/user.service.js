const bcrypt = require("bcrypt");

const User = require("./user.model");
const response = require("./response");

const login = async (email, password) => {
    if (!email || !password) {
        return response({status: "OK", statusCode: '200', message: 'login-credentials-required' });
    }
    const user = await User.findOne({email});
    if(!user){
        return response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No user found", errors: error.message });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword){
        return response({
            status: "OK", statusCode: "200", type: "user", message: "Password Valid", data: { userId: user._id, email: user.email }
        });
    }
  }


  module.exports = {
    login,
  }
  